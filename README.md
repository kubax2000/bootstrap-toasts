# Bootstrap Toasts
This library allows you create <a href="https://getbootstrap.com/docs/4.3/components/toasts/" title="Toasts">toasts</a> by JavaScript.

##Install

```
npm install bootstrap-toasts-js --save
```

## CDN
- **jsDelivr**
```
<script src="https://cdn.jsdelivr.net/npm/bootstrap-toasts-js/dist/js/bootstrap-toasts-js.js"></script>
```
```
<script src="https://cdn.jsdelivr.net/npm/bootstrap-toasts-js/dist/js/bootstrap-toasts-js.min.js"></script>
```

## How to use it?
```
<script src="path/to/bootstrap-toasts-js.min.js"></script>

// Toast box
$('body').addToast({content: 'Hello world!', title: 'First Toast'});

// Toast confirm box
$('#example2').addConfirmToast({buttons: [{content: 'Yes', onClick: () => {alert('Thanks!!')}},{content: 'Definitely yes!', onClick: () => {alert('Thanks you so much!!')}, type: 'danger'}],content: 'Do you like bootstrap-toasts-js?', title: 'Question of life', type: 'success'});
```

## Demo 

<a href="https://kubax2000.github.io/bootstrap-toasts-js/" target="_blank" title="bootstrap-toasts-js">https://kubax2000.github.io/bootstrap-toasts-js/</a>

## Parameter Description

###Global

- **autoDestroy**: boolean <i>(default: false)</i> - Enable toast remove after displayTime
- **autoHide**: boolean <i>(default: false)</i> - Enable toast hide after displayTime
- **closable**: boolean <i>(default: true)</i> - Show close button
- **closeAction**: string <i>(default: "destroy")</i> ["destroy","hide"] - Is toast will have button to close
- **content**: string <i>(required)</i> - Content of toast
- **closeAction**: Date <i>(default: new Date())</i> - Used to display time difference
- **displayTime**: number <i>(default: 2000)</i> - Time in milliseconds over which will be displayed toast
- **elementId**: string <i>(default: "toast-" + currentId)</i> - Id of toast box
- **fadeOutAnimation** boolean <i>(default: true)</i> - Show fade out animation
- **fadeOutDelay**: number <i>(default: 500)</i> - Time in milliseconds of fade out animation
- **headerClasses**: function <i>(default: function)</i> - Function returning header classes based on toast type; Used to select right header text color
- **iconClass**: string <i>(default: null)</i> - Class of span in header. Used to icons.
- **iconImgSrc**: string <i>(default: null)</i> - Path to image
- **iconImgStyles**: string <i>(default: "height: 20px; width: 20px;")</i> - Style of image icon
- **lang**: string <i>(default: "en")</i> - Language of add time
- **onAutoClose**: function <i>(default: null)</i> - Function called on auto close
- **onClose**: function <i>(default: null)</i> - Function called on close (cause by close button)
- **onHide**: function <i>(default: null)</i> - Function called on hide (auto close or close)
- **progress**: object - Close progressbar options
  - **animated**: bool <i>(default: false)</i> - Enable progress bar animation
  - **bgColor**: string <i>(default: null)</i> - Progress bar background color
  - **show**: bool <i>(default: true)</i> - Show progress bar
  - **stripped**: bool <i>(default: false)</i> - Enable stripped look of progress bar (bootstrap`s "progress-bar-striped")
  - **type**: string <i>(default: "primary")</i> ["success","warning","danger",...] - Type of progress bar
- **show**: boolean <i>(default: true)</i> - Show toast
- **showTimeLabel**: boolean <i>(default: true)</i> - Show add time label
- **title**: string <i>(required)</i> - Title of toast
- **type**: string <i>(default: "default")</i> ["success","warning","danger",...] - Type of toast

###AddConfirmToast

- **buttons**: array - Array of options objects
  - **content**: string <i>(required)</i> - Content of button
  - **default**: boolean <i>(default: true)</i> - On click function is used on close
  - **onClick**: function <i>(default: null)</i> - Function called on click
  - **type**: string <i>(default: "primary")</i> ["success","warning","danger",...] - Type of button
- **buttonsAlign**: string <i>(default: "right")</i> - Align of buttons