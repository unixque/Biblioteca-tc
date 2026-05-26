import { supabase } from './supabase'

/**
 * Sends an email via Resend and creates a notification in the database.
 * @param {string} userId - ID of the user to notify
 * @param {string} userEmail - Email address of the user
 * @param {string} type - Notification type (success, info, warning, error)
 * @param {string} subject - Email subject and Notification title
 * @param {string} message - Plain text / short HTML used for in-app notification description
 * @param {string} template - Named email template key (for Edge renderer)
 * @param {object} templateData - Data passed to the Edge template (bookTitle, urls, etc.)
 */
export const notifyUser = async ({
  userId,
  userEmail,
  type = 'info',
  subject,
  message,
  template,
  templateData = {}
}) => {
  // 1. Insert into Supabase notifications table
  try {
    const { error } = await supabase.from('notifications').insert({
      user_id: userId,
      title: subject,
      message: message.replace(/<[^>]*>?/gm, ''), // Strip HTML for the in-app notification
      type: type
    })
    if (error) console.error('Failed to create notification:', error)
  } catch (err) {
    console.error('Notification error:', err)
  }

  // 2. Send Email via Resend
  if (!userEmail) {
    console.warn('Cannot send email: missing email address')
    return
  }

  try {
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: {
        to: userEmail,
        template,
        data: templateData
      }
    })

    if (error) {
      console.error('Edge Function error:', error)
    }
  } catch (err) {
    console.error('Failed to dispatch email via Edge Function:', err)
  }
}
