import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEnvelope, faPhone, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './../assets/css/dashboard-content.css'; // Reusing modal CSS

const HelpSupportModal = ({ isOpen, onClose }) => {
  const [openFaq, setOpenFaq] = useState(null);
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const faqs = [
    { question: 'How do I reset my password?', answer: 'You can reset your password by going to the Profile section and clicking on "Change Password".' },
    { question: 'Where can I see my schedule?', answer: 'Your daily schedule is available on your main Dashboard under the Calendar events section.' },
    { question: 'Who do I contact for technical issues?', answer: 'Please use the contact form below or email support@schoolerp.com directly.' }
  ];

  const handleToggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    alert('Your support request has been sent! We will get back to you shortly.');
    setMessage('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1050 }}>
      <div className="event-detail-modal glass-panel" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header" style={{ borderTop: '4px solid var(--primary-color)' }}>
          <h3>Help & Support</h3>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        
        <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          
          <div className="support-section">
            <h4 style={{ color: 'var(--text-main)', marginTop: 0 }}>Frequently Asked Questions</h4>
            <div className="faq-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '15px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)' }} onClick={() => handleToggleFaq(index)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff', fontWeight: '600' }}>
                    {faq.question}
                    <FontAwesomeIcon icon={openFaq === index ? faChevronUp : faChevronDown} style={{ color: 'var(--primary-color)' }} />
                  </div>
                  {openFaq === index && (
                    <div style={{ marginTop: '10px', color: 'var(--text-light)', fontSize: '14px', lineHeight: '1.5' }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="support-section" style={{ marginTop: '20px' }}>
            <h4 style={{ color: 'var(--text-main)' }}>Contact Support</h4>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '15px', color: 'var(--text-muted)', fontSize: '14px' }}>
              <span><FontAwesomeIcon icon={faEnvelope} style={{ color: 'var(--accent-color)', marginRight: '8px' }}/> support@schoolerp.com</span>
              <span><FontAwesomeIcon icon={faPhone} style={{ color: 'var(--accent-color)', marginRight: '8px' }}/> +1 (800) 123-4567</span>
            </div>
            <form onSubmit={handleSendMessage} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue or ask a question..."
                style={{ width: '100%', padding: '15px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', resize: 'vertical', minHeight: '100px', outline: 'none' }}
                required
              />
              <button type="submit" className="send-btn" style={{ alignSelf: 'flex-end', padding: '12px 25px', borderRadius: '8px', border: 'none', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HelpSupportModal;
