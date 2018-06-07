const express = require('express');
const { WebClient } = require('@slack/client');
const token = "NcIjzXYT2q2VXhSRasLJEI4o";
const web = new WebClient(token);
const router = express.Router();
const Issue = gh.getIssues("getlarky", "nudge");
const users = ["ishotjr", "bromeostasis", "mcgarveymobile"];
let currentUser = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/issues', function(req, res, next) {
    if (req.body && req.body.action == "opened") {
        if (req.body.issue && req.body.issue.number) {
            let next = nextUser()
            console.log(next);
            Issue.editIssue(req.body.issue.number, {
                assignees: [next]
            });
        }
    }
    res.status(200).json({});
});

router.post('/dave', function(req, res, next) {
    var davisms = ["hot", "nailed it", "hot", "same", "lololol", "same", "off-brand british humour is the best!",
    "mind meld", "same", "HOTTTTTTT", ":fire:", "gonna go park my car", "hawttt", "cock nobblers", "suck it down",
    ":bowtie: :thought_balloon:","H0000TTTTTT", "I respect the boy", "computer?", "/gif morrissey licking chocolate",
    "you're listening to radio soulwax", "chrome just crashed", "evernote just crashed", "blurp", "oops, splipped my splap on that one :blush",
    "who wants to go play a board game?!", "pwnt", "pwnt af", "swag", "can someone teach me how to dab?", "smang it", "I shot JR!"];
    let daveText = "";
    console.log(req.body.text);
    if (req.body.text && req.body.text == "fuck") {
        let expletives = ["shit", "cock", "ass", "dingle", "dick", "fuck", ":eggplant:", "piddle"];
        let nouns = ["biscuit", "bagel", "monkey", "nuggets", "hole", "berries", "knobblers", "burger", "shaman", "funnel",
        "angles", "wagon", "wallet", "hog", ":leopard:", "dragons", "bombs", "tarts", "bubbles", "circles", "whispers", "paddle"];
        let expletive = expletives[Math.floor(Math.random()*expletives.length)]
        let noun = nouns[Math.floor(Math.random()*nouns.length)]
        daveText = expletive + " " + noun
    }
    else{
        daveText = davisms[Math.floor(Math.random()*davisms.length)]
    }
    res.status(200).json({
      "text": daveText,
      "response_type": "in_channel"
    })
});

module.exports = router;

nextUser = function() {
    currentUser++;
    if (currentUser >= users.length) {
        currentUser = 0;
    }
    return users[currentUser];
}
