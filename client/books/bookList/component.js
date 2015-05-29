var React = require("react");
var BookEvents = require("../events");

var BookItem = React.createClass({
  onEdit: function() {
    this.props.pubsub.publish(BookEvents.EDIT, this.props.book);
  },
  onDelete: function() {
    this.props.pubsub.publish(BookEvents.DELETE, this.props.book);
  },

  render: function() {
    var book = this.props.book;

    return (
    );
  }
});

var BookList = React.createClass({
  getInitialState: function() {
    return {
      bookList: []
    };
  },
  componentDidMount: function() {
    this.props.pubsub.subscribe(BookEvents.DATA, this.onDataChange);
  },
  componentWillUnmount: function() {
    this.props.pubsub.unsubscribe(BookEvents.DATA, this.onDataChange);
  },

  onDataChange: function(bookList) {
    this.setState({bookList: bookList});
  },

  render: function() {
    var pubsub = this.props.pubsub;
    var bookList = this.state.bookList;

    return (
    );
  }
});

module.exports = BookList;
