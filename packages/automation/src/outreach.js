// packages/automation/src/outreach.js

require('dotenv').config({ path: require('path').join(__dirname, '../../..', '.env') });

const { PrismaClient } = require('@prisma/client');
const { OpenAI } = require('openai');
const { Resend } = require('resend');

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const resend = new Resend(process.env.RESEND_API_KEY);

async function generateEmail(business) {
  const prompt = `You are a friendly South African tech partner offering a free professional website preview to offline businesses.
Write a concise, personalized email (HTML) to the owner of "${business.name}", a ${business.industry} business. Mention how a modern website can attract more local customers and invite them to claim their free demo at https://omnitechwork.com/demo/${business.id}. Keep it warm, professional, under 150 words.`;
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });
  return response.choices[0].message.content;
}

async function sendEmail(business, htmlContent) {
  // In a real scenario, we would have the owner's email. Here we use a placeholder.
  const toEmail = business.contactEmail || 'placeholder@example.com';
  const subject = 'Your Free Website Preview is Ready 🎉';
  const result = await resend.emails.send({
    from: process.env.FROM_EMAIL,
    to: toEmail,
    subject,
    html: htmlContent,
  });
  return result;
}

async function processPendingBusinesses() {
  const pending = await prisma.business.findMany({
    where: { status: 'PENDING_OUTREACH' },
  });

  for (const biz of pending) {
    try {
      const emailHtml = await generateEmail(biz);
      const sendResult = await sendEmail(biz, emailHtml);

      // Log event
      await prisma.campaignEvent.create({
        data: { businessId: biz.id, eventType: 'email_sent' },
      });

      // Update status
      await prisma.business.update({
        where: { id: biz.id },
        data: { status: 'CONTACTED' },
      });

      console.log(`✅ Email sent to ${biz.name} (id: ${biz.id})`);
    } catch (err) {
      console.error(`❌ Failed for ${biz.name}:`, err);
      // Optionally log failure event
      await prisma.campaignEvent.create({
        data: { businessId: biz.id, eventType: 'email_failed' },
      });
    }
  }
}

processPendingBusinesses()
  .catch((e) => console.error('Unexpected error:', e))
  .finally(async () => {
    await prisma.$disconnect();
  });
