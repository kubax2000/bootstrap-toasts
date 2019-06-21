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

$('body').addToast({content: 'Hello world!', title: 'First Toast'});
```

## Demo 

<a href="https://kubax2000.github.io/bootstrap-toasts-js/" target="_blank" title="bootstrap-toasts-js">https://kubax2000.github.io/bootstrap-toasts-js/</a>

## Parameter Description

- **animation**: boolean <i>(default: true)</i> - Is toast will have fade out animation
- **autoHide**: boolean <i>(default: false)</i> - Is toast will be automatically hided after displayTime
- **closable**: boolean <i>(default: true)</i> - Is toast will have button to close
- **content**: string <i>(required)</i> - Content of toast
- **displayTime**: number <i>(default: 2000)</i> - Time in milliseconds over which will be displayed toast
- **fadeOutDelay**: number <i>(default: 500)</i> - Time in milliseconds of fade out animation
- **headerClasses**: function <i>(default: function)</i> - Function returning header classes based on toast type; Used to select right header text color
- **iconClass**: string - Class of span in header. Used to icons.
- **iconImgSrc**: string - Path to image
- **iconImgStyles**: string <i>(default: "height: 20px; width: 20px;")</i> - Style of image icon
- **lang**: string <i>(default: "en")</i> - Language of add time
- **show**: boolean <i>(default: true)</i> - Is toast will be visible
- **showTimeLabel**: boolean <i>(default: true)</i> - Is add time label will be visible
- **title**: string <i>(required)</i> - Title of toast
- **type**: string <i>(default: "default")</i> - Type of toast ("success","warning","danger",...)