import constants from "../constants";

class GitHubAPI {
  constructor(props) {
    this.url = props.url;
    this.maxCommits = props.maxCommits;
  }

  loadCommits() {
    return fetch(this.url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(constants.noСommitsText);
        }
        return res.json()
      })
      .then((data) => {
        const commits = [];
        for (let key in data) {
          const value = data[key];
          const commit = value.commit;
          commits.push({
            name: commit.committer.name,
            email: commit.committer.email,
            date: new Date(Date.parse(commit.committer.date)),
            message: commit.message,
            avatar: value.committer ? value.committer.avatar_url : '',
          });
        }
        return commits
      })
      .catch((err) => {
        throw new Error(err.message)
      })
  }
}

export default GitHubAPI
