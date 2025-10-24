import React, { useState, useEffect } from "react";
import './App.css';
import { FiPhone, FiVideo, FiMessageSquare, FiEdit, FiTrash2 } from "react-icons/fi";


const STORAGE_KEY = "tria_contacts_v1";


const sampleContacts = [
  { id: 1, name: "Aachal Jain", phone: "+91 11111 11111", email: "aachal@example.com" },
  { id: 2, name: "Bhumi Sharma", phone: "+91 22222 22222", email: "bhumi@example.com" },
  { id: 3, name: "Chirag Patil", phone: "+91 33333 33333", email: "chirag@example.com" },
  { id: 4, name: "Diya Sharma", phone: "+91 44444 44444", email: "diya@example.com" },
  { id: 5, name: "Esha Chaudhari", phone: "+91 55555 55555", email: "esha@example.com" },
  { id: 6, name: "Faiz Khan", phone: "+91 66666 66666", email: "faiz@example.com" },
  { id: 7, name: "Gaurav Mehta", phone: "+91 77777 77777", email: "gaurav@example.com" },
  { id: 8, name: "Harsh Tengse", phone: "+91 88888 88888", email: "harsh@example.com" },
  { id: 9, name: "Isha Pawar", phone: "+91 99999 99999", email: "isha@example.com" },
  { id: 10, name: "Jay Gupta", phone: "+91 10101 01010", email: "jay@example.com" },
  { id: 11, name: "Kashmira Patil", phone: "+91 12121 21212", email: "kashmira@example.com" },
  { id: 12, name: "Lakshmi Desai", phone: "+91 13131 31313", email: "lakshmi@example.com" },
  { id: 13, name: "Mihir Kapoor", phone: "+91 14141 41414", email: "mihir@example.com" },
  { id: 14, name: "Nandkishor Sharma", phone: "+91 15151 51515", email: "nandkishor@example.com" },
  { id: 15, name: "Ojas Thakur", phone: "+91 16161 61616", email: "ojas@example.com" },
  { id: 16, name: "Piyush Gaikwad", phone: "+91 17171 71717", email: "piyush@example.com" },
  { id: 17, name: "Qasim Ali", phone: "+91 18181 81818", email: "qasim@example.com" },
  { id: 18, name: "Rhea Kothari", phone: "+91 19191 91919", email: "rhea@example.com" },
  { id: 19, name: "Sakshi Mohite", phone: "+91 20202 02020", email: "sakshi@example.com" },
  { id: 20, name: "Tanmay Pandey", phone: "+91 21212 12121", email: "tanmay@example.com" },
  { id: 21, name: "Usha Reddy", phone: "+91 22222 22221", email: "usha@example.com" },
  { id: 22, name: "Varsha Gupta", phone: "+91 23232 32323", email: "varsha@example.com" },
  { id: 23, name: "Wahid Khan", phone: "+91 24242 42424", email: "wahid@example.com" },
  { id: 24, name: "Xenia Kapoor", phone: "+91 25252 52525", email: "xenia@example.com" },
  { id: 25, name: "Yashasvi Desai", phone: "+91 26262 62626", email: "yashasvi@example.com" },
  { id: 26, name: "Zoya Shaikh", phone: "+91 27272 72727", email: "zoya@example.com" }
];


export default function App() {
  const [contacts, setContacts] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);


    if (!raw) {
     
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleContacts));
      return sampleContacts;
    }


    try {
      const loaded = JSON.parse(raw);
     
      if (loaded.length < 26) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleContacts));
        return sampleContacts;
      }
      return loaded.sort((a, b) => a.name.localeCompare(b.name));
    } catch {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleContacts));
      return sampleContacts;
    }
  });


  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ id: null, name: "", phone: "", email: "" });


  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);


  function filteredContacts() {
    const q = query.trim().toLowerCase();
    if (!q) return contacts;
    return contacts.filter(c => c.name.toLowerCase().includes(q));
  }


  function handleAddOrEdit(e) {
    e.preventDefault();
    if (!form.name.trim()) return alert("Please enter a name");


    if (form.id) {
      setContacts(prev => {
        const updated = prev.map(c => c.id === form.id ? { ...c, ...form } : c);
        return updated.sort((a, b) => a.name.localeCompare(b.name));
      });
    } else {
      const newContact = { ...form, id: Date.now() };
      setContacts(prev => {
        const updated = [...prev, newContact];
        return updated.sort((a, b) => a.name.localeCompare(b.name));
      });
    }


    setForm({ id: null, name: "", phone: "", email: "" });
    setShowForm(false);
  }


  function handleDelete(id) {
    if (!window.confirm("Delete this contact?")) return;
    setContacts(prev => prev.filter(c => c.id !== id));
  }


  function handleEdit(contact) {
    setForm(contact);
    setShowForm(true);
  }


  function handleCall(name) { alert(`Calling ${name}...`); }
  function handleVideoCall(name) { alert(`Video calling ${name}...`); }
  function handleMessage(name) { alert(`Messaging ${name}...`); }


  return (
    <div className="app">
      <header>
        <h1>Contact List</h1>
      </header>


      <div className="controls">
        <input
          aria-label="Search contacts"
          placeholder="Search contacts"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button onClick={() => setShowForm(s => !s)}>
          {showForm ? "Close" : "Add Contact"}
        </button>
      </div>


      {showForm && (
        <form onSubmit={handleAddOrEdit}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
          />
         <div className="phone-input">
  <select
    value={form.countryCode || "+91"}
    onChange={e => setForm(f => ({ ...f, countryCode: e.target.value }))}
  >
    <option value="+91">🇮🇳 +91</option>
    <option value="+1">🇺🇸 +1</option>
    <option value="+44">🇬🇧 +44</option>
    <option value="+61">🇦🇺 +61</option>
    <option value="+81">🇯🇵 +81</option>
  </select>


  <input
    placeholder="Phone number"
    value={form.phone}
    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
  />
</div>


          <input
            placeholder="Email "
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          />
          <div className="form-buttons">
            <button type="submit">{form.id ? "Update" : "Save"}</button>
            <button type="button" className="cancel" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}


      <main className="list-wrap">
        {filteredContacts().length === 0 ? (
          <p className="no-contacts">No contacts found.</p>
        ) : (
          filteredContacts().map(contact => (
            <article key={contact.id} className="card">
              <div className="card-left">
                <div className="avatar">{contact.name[0].toUpperCase()}</div>
                <div>
                  <strong>{contact.name}</strong>
                  <div>{(contact.countryCode || "") + " " + (contact.phone || "—")}</div>


                  {contact.email && <div>{contact.email}</div>}


                </div>
              </div>


              <div className="card-actions">
                <button className="icon-btn call" title="Call" onClick={() => handleCall(contact.name)}><FiPhone /></button>
                <button className="icon-btn video" title="Video Call" onClick={() => handleVideoCall(contact.name)}><FiVideo /></button>
                <button className="icon-btn message" title="Message" onClick={() => handleMessage(contact.name)}><FiMessageSquare /></button>
                <button className="icon-btn edit" title="Edit" onClick={() => handleEdit(contact)}><FiEdit /></button>
                <button className="icon-btn delete" title="Delete" onClick={() => handleDelete(contact.id)}><FiTrash2 /></button>
              </div>
            </article>
          ))
        )}
      </main>
    </div>
  );
}
