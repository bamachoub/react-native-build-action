module.exports = class {
  constructor ({ githubEvent, argv, config }) {


    this.config = config
    this.argv = argv
    this.githubEvent = githubEvent
  }

  async execute () {


    return this.config
  }
}