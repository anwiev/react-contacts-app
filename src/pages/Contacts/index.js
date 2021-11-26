import { useState, useEffect } from "react";

export const Contacts = () => {
  // array where we get contacts
  const [contacts, setContacts] = useState([]);
  // loading status
  const [isLoading, setIsLoading] = useState(true);
  // error status
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getContacts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://randomuser.me/api/?results=200");
        const { results, error } = await response.json();
        if (error) {
          throw new Error(error);
        }
        setContacts(results);
        setIsError(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getContacts();
  }, []);

  // build interface
  if (isLoading) {
    return <div>...loading</div>;
  }

  if (isError) {
    return <div>...error</div>;
  }

  return <div> Contacts {contacts[0].name.first} </div>;
};
