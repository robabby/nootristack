const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Stack = mongoose.model('stacks')

module.exports = app => {
  // STACKS
  app.get('/api/stacks', requireLogin, async (req, res) => {
    const stacks = await Stack.find({ _user: req.user.id });

    res.send(stacks);
  });

  app.post('/api/stack', requireLogin, async (req, res) => {
    const { title, supplements, isActive, notes } = req.body;
    let cost = 0;

    supplements.map((item, index) => {
      cost += parseFloat(item.price);
      supplements[index]._user = req.user.id;
    })

    console.log(notes);

    // Create the new stack
    const stack = new Stack({
      title,
      isActive,
      notes,
      supplements,
      cost,
      _user: req.user.id,
      dateCreated: Date.now()
    });

    // Save the stack
    try {
      await stack.save();

      const stacks = await Stack.find({ _user: req.user.id });
      req.user.stacks = stacks.length;

      const user = await req.user.save();

      res.send(user);
    } catch (e) {
      res.status(422);
    }
  });

  // STACK
  app.get('/api/stack/:id', requireLogin, async (req, res) => {
    const stack = await Stack.findById(req.params.id);

    res.send(stack);
  });

  app.delete('/api/stack/:id', requireLogin, async (req, res) => {
    const stack = await Stack.findByIdAndRemove(req.params.id);

    try {
      await stack.save();

      const stacks = await Stack.find({ _user: req.user.id });
      req.user.stacks = stacks.length;

      const user = await req.user.save();

      res.send(stacks);
    } catch (e) {
      res.status(422);
    }
  });
};
