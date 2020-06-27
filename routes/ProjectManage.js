// 老師要能夠看得到自己打的分數
// 登出清cookie

var express = require('express');
var router = express.Router();

let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('db_GPMS.db', function(err)
{
  if(err) throw err;
})

/* GET home page. */
router.get('/', function(req, res, next) {
  const sql_string = 'SELECT * FROM account WHERE PassKey=?'
  db.all(sql_string,req.cookies.PassKey, function(err, row)
  {
    if (err) throw err;
    if(row.length==0){
      res.render('projectManage')
    }
    else{
    if(row[0]['Permission']==1||row[0]['Permission']==2){
      const s_string='SELECT * FROM GraduationProject WHERE Semester="109"'
      db.all(s_string, function(err, row){
        if (err) throw err;
        //console.log(row)
        res.render('projectManage', {project: row})
      })
    }
    else{
      const s_string='SELECT * FROM GraduationProject'
      db.all(s_string, function(err, row){
        if (err) throw err;
        res.render('projectManage', {project: row})
      })
    }
  }
  })
});


router.post('/getData', function(req, res, next)
{
  if(userPermission == 2)
  {
    const _sql_string = 'SELECT * FROM GraduationProject'
    db.all(_sql_string, function(err, row)
    {
      if(err) throw err;
      let projectNameList = []
      let projectTeamLeaderList = []
      let projectScoreList = []
      let projectVoteList = []
      row.forEach(item =>
        {
          projectNameList.push(item.Name)
          projectTeamLeaderList.push(item.TeamLeader)
          projectScoreList.push(item.Score)
          projectVoteList.push(item.Vote)
        })


      let sendData = {
        projectNameList: projectNameList,
        projectTeamLeaderList: projectTeamLeaderList,
        projectScoreList: projectScoreList,
        projectVoteList: projectVoteList
      }
      console.log(projectTeamLeaderList)
      res.json(sendData)
    })  
  }
  else if(userPermission == 1)
  {
    const _sql_string = 'SELECT * FROM GraduationProject'
    db.all(_sql_string, function(err, row)
    {
      if(err) throw err;
      let projectNameList = []
      let projectTeamLeaderList = []
      let projectGradeList = []
      row.forEach(item =>
        {
          projectNameList.push(item.Name)
          projectTeamLeaderList.push(item.TeamLeader)
          projectGradeList.push(item.Grade)
        })
      let sendData = {
        projectNameList: projectNameList,
        projectTeamLeaderList: projectTeamLeaderList,
        projectGradeList: projectGradeList
      }
      res.json(sendData)
    })
  }
  else
  {
    const _sql_string = 'SELECT * FROM GraduationProject'
    db.all(_sql_string, function(err, row)
    {
      if(err) throw err;
      let projectNameList = []
      let projectTeamLeaderList = []
      row.forEach(item =>
        {
          projectNameList.push(item.Name)
          projectTeamLeaderList.push(item.TeamLeader)
        })
      console.log(projectTeamLeaderList)
      res.json({projectNameList: projectNameList, projectTeamLeaderList: projectTeamLeaderList})
    })
  }  
})

let userPermission = -1

router.post('/', function(req, res, next) {

  const sql_string = 'SELECT * FROM account WHERE PassKey=?'
  db.all(sql_string, req.cookies.PassKey, function(err, row)
  {
    if(row.length==0){
      res.json({permission:3})
      userPermission = 3
    }
    else{
      if(row[0]['Permission']==0){
        res.json({permission:0})
        userPermission = 0
      }
      else if(row[0]['Permission']==1){
        res.json({permission:1})
        userPermission = 1
      }
      else{
        res.json({permission:2})
        userPermission = 2
      }
    }
  });
});

router.post('/addscore', function(req, res, next){
  check=[]
  find_flag=0

  const sql_string = 'SELECT * FROM GraduationProject WHERE TeamLeader=?'
  db.all(sql_string, req.body.teamLeader, function(err, row)
  {
    if(err) throw err;

    if(row[0]['checkpass']==null){
        row[0]['checkpass']=row[0]['checkpass']+req.body.passkey+';'
        let score=parseInt(row[0]['Grade'])+parseInt(req.body.score)
        const update_string = 'UPDATE GraduationProject SET Grade=?,checkpass=? WHERE TeamLeader=?'
        db.run(update_string,score,row[0]['checkpass'], req.body.teamLeader, function(err, row){
          if(err) throw err;
          res.json({scored: 0})
        })
    }
    else{
        check=row[0]['checkpass'].split(';')
        console.log(check)
        let checkpass=req.body.passkey.split(';')
        for(var i=0;i<check.length;i++){
          if(check[i]==checkpass[1]){
              find_flag=1
              break
          }
        }
        if(find_flag==1){
          res.json({scored: 1})
        }
        else{
              row[0]['checkpass']=row[0]['checkpass']+req.body.passkey+';'
              let score=parseInt(row[0]['Grade'])+parseInt(req.body.score)
              const update_string = 'UPDATE GraduationProject SET Grade=?,checkpass=? WHERE TeamLeader=?'
              db.run(update_string,score,row[0]['checkpass'], req.body.teamLeader, function(err, row){
                if(err) throw err;
                res.json({scored: 0})
              })
          } 
    }
  })

});

router.post('/addstudentscore', function(req, res, next){

  // const sql_string = 'SELECT * FROM GraduationProject WHERE TeamLeader=?'
  // db.all(sql_string, req.body.teamLeader, function(err, row)
  // {
  //   if(err) throw err;
  //   let score=parseInt(row[0]['Score'])+parseInt(req.body.score)  

  //   const update_string = 'UPDATE GraduationProject SET Score=? WHERE TeamLeader=?'
  //   db.run(update_string,score, req.body.teamLeader, function(err, row){
  //     if(err) throw err;
  //     res.json({href: '/systemManage'})

  //   })
  // })


  check=[]
  find_flag=0

  const sql_string = 'SELECT * FROM GraduationProject WHERE TeamLeader=?'
  db.all(sql_string, req.body.teamLeader, function(err, row)
  {
    if(err) throw err;

    if(row[0]['checkpass']==null){
        row[0]['checkpass']=row[0]['checkpass']+req.body.passkey+';'
        let score=parseInt(row[0]['Score'])+parseInt(req.body.score)
        const update_string = 'UPDATE GraduationProject SET Score=?,checkpass=? WHERE TeamLeader=?'
        db.run(update_string,score,row[0]['checkpass'], req.body.teamLeader, function(err, row){
          if(err) throw err;
          res.json({scored: 0})
        })
    }
    else{
        check=row[0]['checkpass'].split(';')
        console.log(check)
        let checkpass=req.body.passkey.split(';')
        for(var i=0;i<check.length;i++){
          if(check[i]==checkpass[1]){
              find_flag=1
              break
          }
        }
        if(find_flag==1){
          res.json({scored: 1})
        }
        else{
              row[0]['checkpass']=row[0]['checkpass']+req.body.passkey+';'
              let score=parseInt(row[0]['Score'])+parseInt(req.body.score)
              const update_string = 'UPDATE GraduationProject SET Score=?,checkpass=? WHERE TeamLeader=?'
              db.run(update_string,score,row[0]['checkpass'], req.body.teamLeader, function(err, row){
                if(err) throw err;
                res.json({scored: 0})
              })
          } 
    }
  })

});
module.exports = router;
