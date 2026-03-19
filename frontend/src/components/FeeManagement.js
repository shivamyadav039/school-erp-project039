import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFileInvoiceDollar, faCheckCircle, faTimes, faDownload } from '@fortawesome/free-solid-svg-icons';
import './../assets/css/student.css'; // Reusing premium table styles

const FeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [amountInput, setAmountInput] = useState('');
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [currentReceiptData, setCurrentReceiptData] = useState(null);

  // Dummy data
  const [students, setStudents] = useState([
    { id: '1', rollNo: 'S001', name: 'John Doe', grade: '10th', totalFee: 5000, paidFee: 2000, status: 'Partial' },
    { id: '2', rollNo: 'S002', name: 'Jane Smith', grade: '9th', totalFee: 4500, paidFee: 4500, status: 'Paid' },
    { id: '3', rollNo: 'S003', name: 'Alice Johnson', grade: '11th', totalFee: 5500, paidFee: 0, status: 'Unpaid' },
  ]);

  const handlePayClick = (student) => {
    setSelectedStudent(student);
    setAmountInput(student.totalFee - student.paidFee);
  };

  const handleFeeSubmit = (e) => {
    e.preventDefault();
    if (!amountInput || amountInput <= 0) return;

    const amount = parseFloat(amountInput);
    
    // Update student data
    const updatedStudents = students.map(s => {
      if (s.id === selectedStudent.id) {
        const newPaid = s.paidFee + amount;
        const newStatus = newPaid >= s.totalFee ? 'Paid' : 'Partial';
        return { ...s, paidFee: newPaid, status: newStatus };
      }
      return s;
    });
    setStudents(updatedStudents);

    // Generate Receipt Data
    const receiptData = {
      receiptNo: 'REC-' + Math.floor(Math.random() * 100000),
      date: new Date().toLocaleDateString(),
      studentName: selectedStudent.name,
      rollNo: selectedStudent.rollNo,
      grade: selectedStudent.grade,
      amountPaid: amount,
      paymentMethod: 'Online / Card',
    };

    setCurrentReceiptData(receiptData);
    setShowReceiptModal(true);
    setSelectedStudent(null);
    setAmountInput('');
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="management-container fade-in">
      <div className="management-header">
        <h2>Fee Management</h2>
        <div className="search-and-filter glass-panel">
          <div className="search-box">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by name or roll number..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="student-list-container glass-panel">
        <table className="student-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Grade</th>
              <th>Total Fee ($)</th>
              <th>Paid Fee ($)</th>
              <th>Balance ($)</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.rollNo.toLowerCase().includes(searchTerm.toLowerCase())).map((student) => (
              <tr key={student.id}>
                <td>{student.rollNo}</td>
                <td className="student-name-cell">{student.name}</td>
                <td>{student.grade}</td>
                <td>{student.totalFee}</td>
                <td>{student.paidFee}</td>
                <td style={{ color: student.totalFee - student.paidFee > 0 ? 'var(--warning-color)' : 'var(--accent-color)', fontWeight: 'bold' }}>
                  {student.totalFee - student.paidFee}
                </td>
                <td>
                  <span className={`status-badge ${student.status.toLowerCase()}`}>{student.status}</span>
                </td>
                <td>
                  {student.status !== 'Paid' ? (
                    <button className="action-btn edit-btn" onClick={() => handlePayClick(student)}>
                      <FontAwesomeIcon icon={faFileInvoiceDollar} /> Collect Fee
                    </button>
                  ) : (
                    <span style={{ color: 'var(--accent-color)' }}><FontAwesomeIcon icon={faCheckCircle} /> Fully Paid</span>
                  )}
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Collect Fee Modal */}
      {selectedStudent && (
        <div className="modal-overlay" onClick={() => setSelectedStudent(null)}>
          <div className="event-detail-modal glass-panel" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ borderTop: '4px solid var(--primary-color)' }}>
              <h3>Collect Fee</h3>
              <button onClick={() => setSelectedStudent(null)} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="modal-body">
              <div className="event-info-row">
                <strong>Student:</strong> <span>{selectedStudent.name} ({selectedStudent.rollNo})</span>
              </div>
              <div className="event-info-row">
                <strong>Balance Due:</strong> <span style={{ color: 'var(--warning-color)', fontWeight: 'bold', fontSize: '18px' }}>${selectedStudent.totalFee - selectedStudent.paidFee}</span>
              </div>
              
              <form onSubmit={handleFeeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '10px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-light)' }}>Amount to Pay ($):</label>
                  <input
                    type="number"
                    min="1"
                    max={selectedStudent.totalFee - selectedStudent.paidFee}
                    value={amountInput}
                    onChange={(e) => setAmountInput(e.target.value)}
                    required
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--primary-color)', color: '#fff', outline: 'none' }}
                  />
                </div>
                <button type="submit" className="send-btn" style={{ marginTop: '10px', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
                  Submit Payment & Generate Receipt
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Premium Receipt Modal (Printable) */}
      {showReceiptModal && currentReceiptData && (
        <div className="modal-overlay" onClick={() => setShowReceiptModal(false)}>
          <div className="event-detail-modal glass-panel receipt-container" style={{ maxWidth: '600px', padding: '0', background: 'var(--bg-card)' }} onClick={(e) => e.stopPropagation()}>
            
            <div id="printable-receipt" className="receipt-content">
              <div className="receipt-header">
                <h2>ECA School ERP</h2>
                <p>Official Payment Receipt</p>
              </div>
              
              <div className="receipt-meta">
                <div>
                  <p><strong>Receipt No:</strong> {currentReceiptData.receiptNo}</p>
                  <p><strong>Date:</strong> {currentReceiptData.date}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p><strong>Payment Method:</strong> {currentReceiptData.paymentMethod}</p>
                </div>
              </div>

              <div className="receipt-details">
                <h4>Student Details</h4>
                <p><strong>Name:</strong> {currentReceiptData.studentName}</p>
                <p><strong>Roll No:</strong> {currentReceiptData.rollNo}</p>
                <p><strong>Grade:</strong> {currentReceiptData.grade}</p>
              </div>

              <div className="receipt-total">
                <h3>Amount Paid:</h3>
                <h2>${currentReceiptData.amountPaid.toFixed(2)}</h2>
              </div>

              <div className="receipt-footer">
                <p>Thank you for your payment!</p>
                <p style={{ margin: '0' }}>This is a computer-generated receipt and requires no signature.</p>
              </div>
            </div>

            <div className="modal-actions" style={{ padding: '20px', background: 'rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
              <button className="cancel-btn" onClick={() => setShowReceiptModal(false)}>Close</button>
              <button className="send-btn" onClick={handlePrintReceipt}>
                <FontAwesomeIcon icon={faDownload} /> Print / Save PDF
              </button>
            </div>
            
            {/* CSS for Premium UI vs Print UI */}
            <style>{`
              .receipt-content {
                padding: 40px;
                color: var(--text-main);
              }
              .receipt-header {
                text-align: center;
                margin-bottom: 30px;
                border-bottom: 1px dashed rgba(255,255,255,0.2);
                padding-bottom: 20px;
              }
              .receipt-header h2 {
                margin: 0 0 10px 0;
                background: linear-gradient(135deg, #a8b1ff, #818cf8);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-weight: 800;
              }
              .receipt-header p {
                margin: 0;
                color: var(--text-light);
                letter-spacing: 1px;
                text-transform: uppercase;
                font-size: 12px;
              }
              .receipt-meta {
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
                color: var(--text-muted);
              }
              .receipt-meta p { margin: 5px 0; }
              .receipt-details {
                background: rgba(255,255,255,0.03);
                padding: 20px;
                border-radius: 8px;
                border: 1px solid rgba(255,255,255,0.05);
                margin-bottom: 30px;
              }
              .receipt-details h4 {
                margin: 0 0 15px 0;
                border-bottom: 1px solid rgba(255,255,255,0.1);
                padding-bottom: 10px;
                color: var(--primary-color);
              }
              .receipt-details p {
                margin: 8px 0;
                color: var(--text-light);
              }
              .receipt-details strong { color: var(--text-main); }
              .receipt-total {
                border-top: 1px solid rgba(255,255,255,0.1);
                border-bottom: 1px solid rgba(255,255,255,0.1);
                padding: 20px 0;
                margin-bottom: 30px;
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
              .receipt-total h3 { margin: 0; color: var(--text-light); }
              .receipt-total h2 { margin: 0; color: var(--accent-color); font-size: 32px; text-shadow: 0 0 10px var(--accent-glow); }
              .receipt-footer {
                text-align: center;
                color: var(--text-muted);
                font-size: 14px;
              }
              
              @media print {
                body * {
                  visibility: hidden;
                }
                #printable-receipt, #printable-receipt * {
                  visibility: visible;
                  color: #000 !important;
                }
                #printable-receipt {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                  background: #fff;
                  padding: 2cm !important;
                }
                .receipt-header h2 {
                  -webkit-text-fill-color: #000 !important;
                  text-shadow: none !important;
                }
                .receipt-details {
                  background: #f8f9fa !important;
                  border: 1px solid #ddd !important;
                }
                .receipt-details h4, .receipt-total h2 {
                  color: #000 !important;
                  text-shadow: none !important;
                }
                .receipt-header, .receipt-details h4, .receipt-total {
                  border-color: #ddd !important;
                }
                .modal-overlay {
                  background: none !important;
                  backdrop-filter: none !important;
                }
                .modal-actions {
                  display: none !important;
                }
              }
            `}</style>
          </div>
        </div>
      )}

    </div>
  );
};

export default FeeManagement;
