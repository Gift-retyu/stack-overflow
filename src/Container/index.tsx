import React, { useEffect, useState, ChangeEvent } from "react";
import UserAccordion, { User } from "../Component/Accordion";
import { Button, TextField } from "@material-ui/core";

interface UserResponse {
  items: User[];
  has_more: boolean;
}

/**
 * The main application component.
 *
 * @component
 * @return {JSX.Element} The JSX element representing the app.
 */
const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    fetchUsers();
  }, [page, searchText]);

  /**
   * Fetches the list of users from the API.
   *
   * @return {Promise<void>} A promise that resolves when the data is fetched.
   */
  const fetchUsers = async (): Promise<void> => {
    try {
      const response = await fetch(
        `http://localhost:8080/http://api.stackexchange.com/2.2/users?pagesize=20&order=desc&sort=reputation&site=stackoverflow&page=${page}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data: UserResponse = await response.json();
      const fetchedUsers: User[] = data.items;

      // Filter users based on search text
      const filteredUsers = fetchedUsers.filter((user: User) =>
        user.display_name.toLowerCase().includes(searchText.toLowerCase())
      );

      setIsLoading(false);
      setError("");
      setUsers(filteredUsers);
      setHasMore(data.has_more);
    } catch (error) {
      setIsLoading(false);
      setError("Failed to fetch data");
    }
  };

  /**
   * Handles the follow action for a user.
   *
   * @param {number} userId - The ID of the user.
   * @return {void}
   */
  const handleFollow = (userId: number): void => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.user_id === userId
          ? { ...user, isFollowing: !user.isFollowing }
          : user
      )
    );
  };

  /**
   * Handles the block action for a user.
   *
   * @param {number} userId - The ID of the user.
   * @return {void}
   */
  const handleBlock = (userId: number): void => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.user_id === userId ? { ...user, isBlocked: true } : user
      )
    );
  };

  /**
   * Handles the next page navigation.
   *
   * @return {void}
   */
  const handleNextPage = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  /**
   * Handles the previous page navigation.
   *
   * @return {void}
   */
  const handlePrevPage = (): void => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  /**
   * Handles the search input change.
   *
   * @param {ChangeEvent<HTMLInputElement>} event - The change event object.
   * @return {void}
   */
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchText(event.target.value);
  };

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={searchText}
        onChange={handleSearchChange}
        style={{ margin: "16px", width: "300px" }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        <h3>User</h3>
        <h3>Reputation</h3>
      </div>
      {users.map((user) => (
        <UserAccordion
          key={user.user_id}
          user={user}
          onFollow={handleFollow}
          onBlock={handleBlock}
        />
      ))}
      {isLoading && <div>Loading...</div>}
      {!isLoading && error && <div>Error: {error}</div>}
      {!isLoading && !error && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            Prev
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextPage}
            disabled={!hasMore}
            style={{ marginLeft: "16px" }}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default App;
