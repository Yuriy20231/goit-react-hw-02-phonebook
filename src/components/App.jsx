import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onChangeInput = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value });
  };

  addContact = data => {
    const haveNameInPhonebook = this.state.contacts.some(
      ({ name }) => name.toLowerCase() === data.name.toLowerCase()
    );
    if (haveNameInPhonebook) {
      return alert(`${data.name} is already in contacts`);
    }
      this.setState(prevState => ({contacts: [{id:nanoid(),...data}, ...prevState.contacts]}));
    
  };

  filter = () => {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return filteredContacts;
  };

  delContact = idContact => {
    this.setState(prevState => ({contacts: prevState.contacts.filter(contact => contact.id !== idContact)}));
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>

        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>

        <Filter filter={this.state.filter} onChangeInput={this.onChangeInput} />

        <ContactList delContact={this.delContact} contacts={this.filter()} />
      </div>
    );
  }
}