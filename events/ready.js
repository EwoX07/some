module.exports = client => {
  const actvs = [
    `with ${client.users.cache.size} users`,
    `at discord.gg/gangsebelah`,
    `at GANG SEBELAH`,
    `and Making Love`
  ];

  console.log("Ready!");
  setInterval(() => {
    const index = Math.floor(Math.random() * actvs.length);
    client.user.setActivity(`${actvs[index]}`);
  }, 30000);
};