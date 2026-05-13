// packages/automation/src/outreach.js

require('dotenv').config({ path: require('path').join(__dirname, '../../..', '.env') });

const { PrismaClient } = require('@prisma/client');
const { OpenAI } = require('openai');
const { Resend } = require('resend');
// We will use standard fetch for Google Places API

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Searches for businesses via Google Places API (Mock/Placeholder logic until API Key is added)
 */
async function searchBusinessesViaGoogleMaps(location = 'Johannesburg', type = 'plumber') {
  console.log(`🗺️ Searching Google Maps for ${type} in ${location}...`);
  // TODO: Replace with actual Google Places API call once GOOGLE_MAPS_API_KEY is available
  // const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${type}+in+${location}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  
  // Returning mock data for now
  return [
    {
      name: `Mock ${type} Business 1`,
      industry: type,
      websiteUrl: null, // No website
      googleMapsUrl: 'https://maps.google.com/?cid=123',
      hasWebsite: false
    },
    {
      name: `Mock ${type} Business 2`,
      industry: type,
      websiteUrl: 'https://example.com', // Has website
      googleMapsUrl: 'https://maps.google.com/?cid=456',
      hasWebsite: true
    }
  ];
}

/**
 * Generates a personalized outreach email pitching web design
 */
async function generateEmail(business) {
  console.log(`📧 Drafting personalized pitch email for ${business.name}...`);
  const prompt = `You are a friendly South African tech partner offering professional web design services to offline businesses.
Write a concise, personalized email (HTML) to the owner of "${business.name}", a ${business.industry} business. Mention that you found them on Google Maps but noticed they don't have a website, which means they are missing out on local customers. Keep it warm, professional, and under 150 words. Invite them to reply to this email.`;
  
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
    subject: `Boost your local presence, ${business.name} 🚀`,
    html: htmlContent,
  });
  
  return result;
}

/**
 * Main Autonomous Lead Generation Loop
 */
async function startAutonomousWorkflow() {
  console.log('🤖 Starting Omniflow Lead Gen Workflow...');
  
  // 1. Search for new businesses
  const newLeads = await searchBusinessesViaGoogleMaps();
  
  for (const leadData of newLeads) {
     // Check if business already exists
     const existing = await prisma.business.findFirst({
        where: { name: leadData.name }
     });

     if (!existing) {
        console.log(`🆕 Adding new business to CRM: ${leadData.name}`);
        await prisma.business.create({
           data: {
              name: leadData.name,
              industry: leadData.industry,
              websiteUrl: leadData.websiteUrl,
              hasWebsite: leadData.hasWebsite,
              googleMapsUrl: leadData.googleMapsUrl,
              status: 'PENDING_RESEARCH'
           }
        });
     }
  }

  // 2. Process pending businesses that need outreach
  const pending = await prisma.business.findMany({
    where: { status: 'PENDING_RESEARCH', hasWebsite: false }
  });

  console.log(`🔎 Found ${pending.length} businesses without websites awaiting outreach.`);

  for (const biz of pending) {
    try {
      // Generate and Send Pitch Email
      const emailHtml = await generateEmail(biz);
      await sendEmail(biz, emailHtml);

      // Log Events & Update Status
      await prisma.campaignEvent.create({
        data: { businessId: biz.id, eventType: 'email_sent' },
      });

      await prisma.business.update({
        where: { id: biz.id },
        data: { status: 'OUTREACH_SENT' },
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
