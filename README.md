# classy.activate.js
a jquery plugin for managin class toggling


use like  

```
$( function() {  
  $('.toggle').classy({
    target: $("body"),
    className: 'active-class',
    clickOff: true,
    indexClass: false
  });
});
```


### target: jquery selector
the placement of the active class

### className: string
the active class to apply

### clickOff: boolean
should clicking anywhere else remove the class

### indexClass: boolean
adds ele-(index) if called on a group of nodes w the same class
