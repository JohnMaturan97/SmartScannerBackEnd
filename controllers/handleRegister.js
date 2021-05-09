export default function handleRegister(req, res, db, bcrypt) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json("missing required information");
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then(async (loginEmail) => {
        const user = await trx("users").returning("*").insert({
          name: name,
          email: loginEmail[0],
          joined: new Date(),
        });
        res.json(user);
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("unable to register"));
}