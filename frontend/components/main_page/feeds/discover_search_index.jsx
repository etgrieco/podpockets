import React from 'react';
import DiscoverIndexItem from './discover_index_item';
import AddFeedForm from './add_feed_form';

class DiscoverSearchIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {query: "", formType: "search"};
    this.handleQueryChange = this.handleQueryChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchFeedResults(this.state.query);
  }

  handleQueryChange(e) {
    this.setState({query: e.target.value});
    this.props.fetchFeedResults(e.target.value);
  }

  getDiscoverIndexItems(feeds) {
    return (
      feeds.results.length === 0 ?
      ["No Feeds Found"] :
      feeds.results.map(resultId => {
        let feed = feeds.byId[resultId];
        return <DiscoverIndexItem
          key={feed.id}
          feed={feed}
          createFeed={this.props.createFeed}
          />;
      })
    );
  }

  discoverSearch(discoverIndexItems) {
    return (
    <div>
      <form>
        <input className="feed-search"
          value={this.state.query}
          onChange={this.handleQueryChange}
          />
      </form>

      {
        this.state.query.length === 0 ?
        <h1>Popular Feeds</h1>
        : <h1>Results</h1>
      }

      <div className="results">
        {discoverIndexItems}
      </div>

    </div>
  );
}

  render() {
    if (this.state.formType === "search") {
      const { feeds } = this.props;
      let discoverIndexItems = this.getDiscoverIndexItems(feeds);
      return this.discoverSearch(discoverIndexItems);
    } else if (this.state.formType === "url") {
      return <AddFeedForm />;
    }
  }
}

export default DiscoverSearchIndex;
