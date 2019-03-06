export default [
  {
    name: 'DISPLAY_SNACK', 
    callback: function(msg, color) {
      this.snackbar = {
        show: true,
        color: color,
        text: msg
      }
    }
  }
];
