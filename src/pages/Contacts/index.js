import { useState, useEffect } from "react";

const useContacts = () => {
  // array where we get contacts
  const [data, setData] = useState([]);
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
        setData(results);
        setIsError(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getContacts();
  }, []);

  return {
    data,
    isLoading,
    isError,
  };
};

export const Contacts = () => {
  const contacts = useContacts();
  // build interface
  if (contacts.isLoading) {
    return <div>...loading</div>;
  }

  if (contacts.isError) {
    return <div>...error</div>;
  }

  return <div> Contacts {contacts.data[0].name.first} </div>;
};
