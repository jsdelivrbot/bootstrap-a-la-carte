var React = require('react')
var ReactDOM = require('react-dom')
var ReactDOMServer = require('react-dom/server')
var htmlBeautify = require('js-beautify').html

const constants = require('./scripts/constants.js')

var SiteNav = require('./components/navigation.jsx')
var elements = require('./components/elements.jsx')

require('./styles/index.scss')


let App = React.createClass({
  getInitialState: function () {
    return {
      selectedElementIndex: constants.elementNames.indexOf('Navigation Bar'),
    }
  },
  changeSelectedElement: function (clickedLiIndex) {
    this.setState({ selectedElementIndex: clickedLiIndex })
  },
  render: function () {
    let featureTitle = constants.elementNames[this.state.selectedElementIndex]
    let Snippet = elements[featureTitle.replace(' ', '')]
    let snippetHtml = ReactDOMServer.renderToStaticMarkup(<Snippet/>)

    return (
      <div>
        <SiteNav
          selectedElementIndex={ this.state.selectedElementIndex }
          liClicked={ this.changeSelectedElement }
        />
        <main>
          <div className="content">
            <h1>{ featureTitle }</h1>
            <Snippet/>
            <h2>Code Snippet</h2>
            <pre className="prettyprint">
              {htmlBeautify(snippetHtml)}
            </pre>
          </div>
        </main>
        <footer>
          <div className="options">
            <a className="btn">Copy to Clipboard</a>
          </div>
        </footer>
      </div>
    )
  }
})


ReactDOM.render(
  <App/>,
  document.getElementById('react-app')
)
