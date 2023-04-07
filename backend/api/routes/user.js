const express = require('express')
const router = express.Router()
const pool = require('../connection/connection')
const jwt = require('jsonwebtoken')



// Kullanıcı Listele
router.get('/', (req, res) => {
  pool.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.error(err)
    } else {
      res.send(result.rows)
    }
  })
})

// Kayıt ol
router.post('/signup', (req, res) => {
  pool.query("INSERT INTO users (fullname, username, password, role) VALUES ($1, $2, crypt($3, gen_salt('bf')), $4)",
    [req.body.fullname, req.body.username, req.body.password, req.body.role],
    (err, result) => {
      if (err) {
        console.error(err)
      } else {
        res.send(result.rows[0])
      }
    })
})

// Giriş yap
router.post('/signin', (req, res) => {
  pool.query("SELECT * FROM users WHERE username = $1 AND password = crypt($2, password)",
    [req.body.username, req.body.password],
    (err, rows, fields) => {
      if (err) {
        console.error(err)
      } else {
        // let data = JSON.stringify(rows)
        const token = jwt.sign({
          username: req.body.username,
          password: req.body.password
        }, 'stil', 
        { expiresIn: '1h' })

        res.json({token: token, userId: req.body.id })
        res.send(rows)
      }
    })
})

//  Kullanıcı güncelleme
router.put('/update/:userId', (req, res) => {
  const { userId } = req.params
  pool.query("UPDATE users SET fullname = $1, username = $2, role = $3 WHERE id = $4",
    [req.body.fullname, req.body.username, req.body.role, userId],
    (err, result) => {
      if (err) {
        console.error(err)
      } else {
        res.send(result.rows[0])
      }
    })
})

//  Kullanıcı silme
router.delete('/delete/:userId', (req, res) => {
  const { userId } = req.params
  pool.query("DELETE FROM users WHERE id = $1",
    [userId],
    (err, result) => {
      if (err) {
        console.error(err)
      } else {
        res.send(result.rows[0])
      }
    })
})


// router.post('/test', verifyToken, (req, res) => {
//   res.json('Informacion secreta');
// })

// function verifyToken(req, res, next) {
//   if (!req.headers.authorization) return res.status(401).json('No autorizado');

//   const token = req.headers.authorization.substr(7);
//   if (token !== '') {
//     const content = jwt.verify(token, 'stil');
//     req.data = content;
//     next();
//   } else {
//     res.status(401).json('Token vacio');
//   }

// }

module.exports = router