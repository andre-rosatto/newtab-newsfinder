export const AddLoginsDetails = (setLogins, username, loginTime) => {
    const logins = JSON.parse(localStorage.getItem('logins')) || [];
    console.log("Dados salvos no localStorage:", logins);
    localStorage.setItem('logins', JSON.stringify([...logins, { username, loginTime }]));
    // setLogins(prevLogins => [...prevLogins, { username, loginTime }]);
};

export const GetLoginsDetails = () => {
    return JSON.parse(localStorage.getItem('logins')) || [];
    // console.log("Dados recuperados do localStorage:", logins);
}