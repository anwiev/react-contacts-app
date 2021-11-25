import { useState, useEffect } from "react";

export const Contacts = () => {
  // array where we get contacts
  const [contacts, setContacts] = useState([]);
  // loading status
  const [isLoading, setIsLoading] = useState(true);
  // error status
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://randomuser.me/api/?results=200")
      .then((response) => response.json())
      .then(({ results }) => {
        setContacts(results);
        setIsLoading(false);
        setIsError(false);
        console.log(results);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  // build interface
  if (isLoading) {
    return <div>...loading</div>;
  }

  if (isError) {
    return <div>...error</div>;
  }

  return <div>Contacts {contacts[0].name.first}</div>;
};
