import React, { useState, useEffect } from "react";
import Modal from "../modal/Modal";
import styles from "./card.module.css";

function Card({ card }) {
  const [tickets, setTickets] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    member: "",
    duration: "",
    ticketName: "",
  });

  useEffect(() => {
    // Retrieve columns from local storage
    const storedColumns = JSON.parse(localStorage.getItem("columns")) || [];

    // Extract ticket data from each column
    const allTickets = storedColumns.reduce((acc, column) => {
      return acc.concat(column.tickets);
    }, []);

    // Update state with ticket data
    setTickets(allTickets);
  }, []);

  function handleCloseModal() {
    setIsOpen(false);
  }

  const createTicket = () => {
    setIsOpen(true);
  };

  const handleTicketClick = (ticket) => {
    setFormData({
      ticketName: ticket.title,
      member: ticket.member,
      duration: ticket.duration,
    });
    setIsOpen(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newTicket = {
      id: Date.now(),
      title: event.target.ticketName.value,
      member: event.target.member.value,
      duration: event.target.duration.value,
    };

    const updatedTickets = [...tickets, newTicket];
    setTickets(updatedTickets);

    localStorage.setItem(
      "ticketData",
      JSON.stringify({ tickets: updatedTickets })
    );
    handleCloseModal();
  };

  return (
    <div className="card">
      <div className={styles.ticketlist}>
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className={styles.ticket}
            onClick={() => handleTicketClick(ticket)}
          >
            <p className={styles.title}>{ticket.title}</p>
          </div>
        ))}
      </div>
      <button className={styles.cratebtn} onClick={createTicket}>
        Create Ticket
      </button>
      <Modal isOpen={isOpen} onClose={handleCloseModal} title="Create new task">
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="ticketName">Ticket Name:</label>
            <input
              type="text"
              id="ticketName"
              name="ticketName"
              defaultValue={formData.ticketName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="member">Member:</label>
            <select id="member" name="member" defaultValue={formData.member}>
              <option value="John">John</option>
              <option value="Doe">Doe</option>
              <option value="Jane">Jane</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration:</label>
            <select
              id="duration"
              name="duration"
              defaultValue={formData.duration}
            >
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1 hour 30 minutes</option>
              <option value="120">2 hours</option>
              <option value="150">2 hours 30 minutes</option>
              <option value="180">3 hours</option>
              <option value="210">3 hours 30 minutes</option>
              <option value="240">4 hours</option>
            </select>
          </div>
          <button className={styles.cratebtn} type="submit">
            Create
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default Card;
