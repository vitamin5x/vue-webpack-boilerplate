// Mixin for search
import {Xhr} from 'base/vue-resource'
export default {
  methods: {
    searchStart: function() {
      this.message = ''
      this.items = []
      this.isLoading = true
    },
    search: function(url, options = {}) {
      this.searchStart()
      Xhr.get(url, options, this.success, this.error)
    },
    success: function(response) {
      this.items = response.data.items
      this.page = 1
      this.searchEnd()
    },
    error: function(response) {
      switch(response.status) {
        case 403:
          this.message = 'API rate limit exceeded'
          break
        default:
          this.message = response.statusText
      }
      this.searchEnd()
    },
    searchEnd: function() {
      this.isLoading = false
    }
  }
}