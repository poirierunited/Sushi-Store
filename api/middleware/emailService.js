// utils/emailService.js
const nodemailer = require('nodemailer');

// Function to send an email to a client with the provided details
const sendEmailToClient = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'istrador.fukusuke@gmail.com',
      pass: 'pqlh xucc pkdr gdub',
    },
  });

  const mailOptions = {
    from: 'istrador.fukusuke@gmail.com',
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Function to generate a receipt for an order
const generateReceipt = (order) => {
  return `
    Boleta del Pedido #${order._id}
    ============================
    Fecha: ${new Date(order.paidAt).toLocaleDateString()}
    Total: $${order.totalPrice.toFixed(0)}

    Productos:
    ${order.orderItems.map(item => `${item.name} - $${item.price.toFixed(0)} x ${item.quantity}`).join('\n')}
    
    Gracias por su compra!
  `;
};

// Function to send a receipt to a client
const sendReceiptToClient = async (order) => {
  const receipt = generateReceipt(order);
  const subject = `Boleta del Pedido #${order._id}`;
  const to = order.paymentResult.emailAddress;

  try {
    await sendEmailToClient(to, subject, receipt);
    console.log('Receipt sent successfully');
  } catch (error) {
    console.error('Error sending receipt:', error);
  }
};

module.exports = {
  sendEmailToClient,
  sendReceiptToClient,
  generateReceipt,
};