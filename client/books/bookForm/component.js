var React = require("react");
var BookEvents = require("../events");

var BookForm = React.createClass({
  getInitialState: function() {
    return {
      book: {},
      editing: false
    };
  },
  componentDidMount: function() {
    this.props.pubsub.subscribe(BookEvents.EDIT, this.onEdit);
  },
  componentWillUnmount: function() {
    this.props.pubsub.unsubscribe(BookEvents.EDIT, this.onEdit);
  },

  onEdit: function(book) {
    this.setState({editing: true, book: book});
  },

  onNew: function() {
    this.setState({editing: true});
  },

  onSave: function(event) {
    event.preventDefault();
    this.props.pubsub.publish(BookEvents.SAVE, this.state.book);
    this.setState({editing: false, book: {}});
  },
  onCancel: function(event) {
    event.preventDefault();
    this.setState({editing: false, book: {}});
  },

  onChangeText: function(field) {
    var self = this;

    return function(event) {
      var book = self.state.book;
      book[field] = event.target.value;
      self.setState({book: book});
    };
  },

  render: function() {
    var book = this.state.book;

    var form = null;
    if (this.state.editing) {
      form = (
      );
    }

    return (
    );
  }
});

module.exports = BookForm;
