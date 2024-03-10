

export const AddLoginsDetails = (setLogins, username, loginTime) => {
    setLogins(prevLogins => [...prevLogins, { username, loginTime }]);
};