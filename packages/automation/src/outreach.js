// packages/automation/src/outreach.js

require('dotenv').config({ path: require('path').join(__dirname, '../../..', '.env') });

const { PrismaClient } = require('@prisma/client');
const { OpenAI } = require('openai');
const { Resend } = require('resend');

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Generates the AI Landing Page content for the Demo Site
 */
async function generateDemoContent(business) {
  console.log(`🎨 Generating AI Demo content for ${business.name}...`);
  const prompt = `Generate a professional website content for a business named "${business.name}" in the "${business.industry}" industry.
  Return ONLY a JSON object with the following structure:
  {
    "hero": { "title": "string", "subtitle": "string", "cta": "string" },
    "features": [ { "title": "string", "description": "string" } ],
    "about": "string",
    "testimonials": [ { "quote": "string", "author": "string" } ]
  }`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a professional web copywriter.' },
      { role: 'user', content: prompt }
    ],
    response_format: { type: 'json_object' },
  });

  const generatedJson = completion.choices[0].message.content;

  await prisma.demoSite.upsert({
    where: { businessId: business.id },
    update: { generatedCopy: generatedJson, templateId: 'default-v1' },
    create: { businessId: business.id, generatedCopy: generatedJson, templateId: 'default-v1' },
  });

  console.log(`✅ Demo content saved for ${business.name}`);
}

/**
 * Generates a personalized outreach email
 */
async function generateEmail(business) {
  console.log(`📧 Drafting personalized email for ${business.name}...`);
  const prompt = `You are a friendly South African tech partner offering a free professional website preview to offline businesses.
Write a concise, personalized email (HTML) to the owner of "${business.name}", a ${business.industry} business. Mention how a modern website can attract more local customers and invite them to claim their free demo at https://omniflow-marketing.vercel.app/demo/${business.id}. Keep it warm, professional, under 150 words.`;
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });
  
  return response.choices[0].message.content;
}

/**
 * Sends the email via Resend
 */
async function sendEmail(business, htmlContent) {
  const leads = await prisma.lead.findMany({ where: { businessId: business.id } });
  const toEmail = leads[0]?.email || 'hello@omnitechwork.com'; // Fallback for testing
  
  console.log(`📤 Sending email to ${toEmail}...`);
  
  const result = await resend.emails.send({
    from: process.env.FROM_EMAIL || 'Omniflow <outreach@omnitechwork.com>',
    to: toEmail,
    subject: `Your Free Website Preview for ${business.name} is Ready 🎉`,
    html: htmlContent,
  });
  
  return result;
}

/**
 * Main Autonomous Loop
 */
async function startAutonomousWorkflow() {
  console.log('🤖 Starting Omniflow Autonomous Workflow...');
  
  const pending = await prisma.business.findMany({
    where: { status: 'PENDING_OUTREACH' },
    include: { demoSite: true }
  });

  console.log(`🔎 Found ${pending.length} businesses awaiting outreach.`);

  for (const biz of pending) {
    try {
      // 1. Generate Demo if missing
      if (!biz.demoSite) {
        await generateDemoContent(biz);
      }

      // 2. Generate and Send Email
      const emailHtml = await generateEmail(biz);
      await sendEmail(biz, emailHtml);

      // 3. Log Events & Update Status
      await prisma.campaignEvent.create({
        data: { businessId: biz.id, eventType: 'email_sent' },
      });

      await prisma.business.update({
        where: { id: biz.id },
        data: { status: 'CONTACTED' },
      });

      console.log(`✨ Successfully processed ${biz.name}\n`);
    } catch (err) {
      console.error(`❌ Workflow failed for ${biz.name}:`, err.message);
      await prisma.campaignEvent.create({
        data: { businessId: biz.id, eventType: 'email_failed' },
      });
    }
  }
  
  console.log('🏁 Workflow cycle complete.');
}

startAutonomousWorkflow()
  .catch((e) => console.error('CRITICAL ERROR:', e))
  .finally(async () => {
    await prisma.$disconnect();
  });
