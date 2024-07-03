export const generateTicketConfirmationEmail = (
    userName: string,
    movieName: string,
    showtime: string,
    seatNumbers: string,
    screen: number,
    transactionId: string,
    ticketHolderNames: string[]
  ) => {
    const ticketHoldersList = ticketHolderNames.map((name, index) => `<li><strong>Ticket ${index + 1} Holder:</strong> ${name}</li>`).join('');
    return `
      <h1>Ticket Confirmation</h1>
      <p>Payment ID: ${transactionId}</p>
      <p>Dear ${userName},</p>
      <p>Thank you for purchasing tickets. Here are your ticket details:</p>
      <ul>
        <li><strong>Movie Name:</strong> ${movieName}</li>
        <li><strong>Showtime:</strong> ${showtime}</li>
        <li><strong>Screen:</strong> ${screen}</li>
        <li><strong>Seat Numbers:</strong> ${seatNumbers}</li>
        ${ticketHoldersList}
      </ul>
      <p>Enjoy your movie!</p>
    `;
  };
  