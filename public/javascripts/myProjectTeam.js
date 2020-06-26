const classNames = {
  DELETE: "delete" };


const logger = {
  logging: false,
  log(msg) {
    if (this.logging) console.log(msg);
  } };


const itemProto = {
  teamleader: false,
  toggle() {
    this.teamleader = !this.teamleader;
    this.trigger("toggled", this);
  } };


const items = {
  list: [],

  add(item) {
    let newItem = Object.create(itemProto);
    Object.assign(newItem, item, Backbone.Events);
    newItem.on("toggled", function (item) {
      logger.log("toggled");
      view.addToList(item);
    });
    newItem.id = _.uniqueId();
    this.list.push(newItem);
    this.trigger("itemAdded", newItem);
    this.trigger("updated");
  },

  delete(id) {
    logger.log("delete: " + id);
    let item = _.find(items.list, {
      "id": id });


    view.remove(item.$el);

    this.list = _.pull(this.list, item);
    this.trigger("updated");
  },

  toggle(id) {
    _.find(items.list, {
      "id": id }).
    toggle();

    this.trigger("updated");
  } };


const app = {
  init() {
    view.init();
    Object.assign(items, Backbone.Events);
    items.on("itemAdded", function (item) {
      logger.log("item added");
      view.addToList(item);
    });

    items.on("updated", function () {
      logger.log("updated");
      view.updateQuantities();
    });
  } };


const view = 
{
  init() {

    this.$teammateList = $("#teammate-list");
    this.$teamleaderList = $("#teamleader-list");
    this.$form = $("form");

    const handleSubmit = function (e) {
      e.preventDefault();

      let name = $("#item-input"),
      student_id = $("#student_id-input");

      if (name.val()) {
        items.add({
          name: name.val(),
          student_id: student_id.val() || 1 });

      }

      name.val("");
      student_id.val("");

    };

    const handleClick = function (e) {
      e.preventDefault();
      logger.log("Clicked");

      if (e.target.nodeName === "LI") {
        let id = $(e.target).data("id").toString();
        items.toggle(id);
      } else if (e.target.className === classNames.DELETE) {
        let id = $(e.target).parent().data("id").toString();
        items.delete(id);
      }
    };

    const handleDelete = function (e) {
      e.preventDefault();
      logger.log("Delete: " + item);
      let id = $(e.target).data("id").toString(),
      item = _.find(items.list, {
        "id": id });


    };

    $("#lists").on("click", handleClick);
    this.$form.on("submit", handleSubmit);
    $("." + classNames.DELETE).on("click", handleDelete);

  },

  addToList(item, list) {
    let $item = item.$el || this.createListItem(item);

    if (item.teamleader) {
      $item.prependTo(this.$teamleaderList);
    } else {
      $item.appendTo(this.$teammateList);
    }
  },

  updateQuantities() {
    logger.log("updateQuantities");
    $("#teammate-num").html(this.$teammateList.children().length);
    $("#teamleader-num").html(this.$teamleaderList.children().length);
  },

  remove($el) {
    $el.remove();
  },

  createListItem(item) {
    item.$el = $(`<li data-id=${item.id}>${item.name} <span class="student_id">${item.student_id}</span><span class="delete">X</span></li>`);

    return item.$el;
  },

  getListItem(id) {
    let $el = $("li[data-id='" + id + "']");
    return $el.length ? $el : null;
  },

  render(items) {
    logger.log("render");

    this.$teammateList.empty();
    this.$teamleaderList.empty();

    items.forEach(item => {
      let $item = $(`<li data-id=${item.id}>${item.name}<span>${item.student_id}</span></li>`);

      if (item.teamleader) {
        this.$teamleaderList.append($item);
        $item.addClass("teamleader");
      } else {
        this.$teammateList.append($item);
      }
    });

  } 
};


app.init();


var SubmitControl = document.querySelector('.btn');
SubmitControl.addEventListener('click', (event) => {
  var All_id = document.querySelectorAll('.student_id')
  console.log(All_id);
  var Leader_id = document.querySelectorAll('.student_id')[0].innerText
  
  console.log(Leader_id);

  var Mate_list=[]
  for (i = 0; i < All_id.length; i++) 
  { 
    Mate_list.push(document.querySelectorAll('.student_id')[i].innerText)
  }
  
  console.log(Leader_id)
  console.log(Mate_list)
  console.log(All_id);


  sendToServer(Mate_list, Leader_id)
});

let sendToServer = function(mate_list, leader_id)
{
  console.log(leader_id)
  console.log(mate_list)
  let Send_id = {
    mate_list: JSON.stringify(mate_list),
    leader_id: leader_id  
  };
  $.ajax({
    url: '/teacherMain/myProjectTeam',
    type: 'POST',
    data: Send_id,
    datatype: 'json',
  }).done(function (rcvMessage) {
      console.log(rcvMessage.res)
  })


}

$.ajax({
  url: '/teacherMain/myProjectTeam/getData',
  type: 'POST',
  data: '',
  datatype: 'json',
}).done(function (rcvMessage) {
    console.log(rcvMessage.studentList)
})

