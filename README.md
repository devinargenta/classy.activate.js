# classy.activate.js
a jquery plugin for managin class toggling


use like  

```
$( function() {  
  $('.toggle').classy({
    target: $("body"),
    className: 'active-class',
    clickOff: true,
    indexClass:
  });
});
```


### target
the placement of the active class

### className
the active class to apply

### clickOff
should clicking anywhere else remove the class

### indexClass
adds ele-(index) if called on a group of nodes w the same class
