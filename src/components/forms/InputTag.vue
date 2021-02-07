<template lang="pug">
  .tags-input-root(style="position: relative;")
    div(:class="{[wrapperClass + ' tags-input']: true, 'active': isActive }").input
      span.tags__item.tags-input__item(v-for="(tag, index) in tags" :key="index")
        span(v-html="tag.value")

      input(type="text"
        ref="taginput"
        :placeholder="placeholder"
        v-model="input"
        v-show="!hideInputField"
        @keydown.enter.prevent="tagFromInput(false)"
        @keydown.8="removeLastTag"
        @keydown.down="nextSearchResult"
        @keydown.up="prevSearchResult"
        @keydown="onKeyDown"
        @keyup="onKeyUp"
        @keyup.esc="clearSearchResults"
        @focus="onFocus"
        @click="onClick"
        @blur="onBlur"
        @value="tags")

      input(type="hidden" v-if="elementId" :name="elementId" :id="elementId" v-model="hiddenInput")


    <!-- Typeahead/Autocomplete -->
    div(v-show="searchResults.length")
      p(v-if="typeaheadStyle === 'badges'" :class="`typeahead-${typeaheadStyle}`")
        span(v-if="!typeaheadHideDiscard" @click.prevent="clearSearchResults(true)" v-text="discardSearchText").tags-input-badge.typeahead-hide-btn.tags-input-typeahead-item-default
        span(v-for="(tag, index) in searchResults"
          :key="index"
          v-html="tag.value"
          @mouseover="searchSelection = index"
          @mousedown.prevent="tagFromSearchOnClick(tag)"
          class="tags-input-badge"
          v-bind:class="{'tags-input-typeahead-item-default': index !== searchSelection, 'tags-input-typeahead-item-highlighted-default': index === searchSelection}")

      ul(v-else-if="typeaheadStyle === 'dropdown'" :class="`typeahead-${typeaheadStyle}`")
        li(v-if="!typeaheadHideDiscard" @click.prevent="clearSearchResults(true)" v-text="discardSearchText").tags-input-typeahead-item-default.typeahead-hide-btn

        li(
          v-for="(tag, index) in searchResults"
          :key="index"
          v-html="tag.value"
          @mouseover="searchSelection = index"
          @mousedown.prevent="tagFromSearchOnClick(tag)"
          v-bind:class="{'tags-input-typeahead-item-default': index !== searchSelection, 'tags-input-typeahead-item-highlighted-default': index === searchSelection}"
        )

</template>

<script>
  export default {
    name: 'InputTag', props: {
      elementId: String,

      existingTags: {
        type: Array,
        default: () => {
          return [];
        }
      },

      value: {
        type: Array,
        default: () => {
          return [];
        }
      },

      typeahead: {
        type: Boolean,
        default: false
      },

      typeaheadStyle: {
        type: String,
        default: 'badges'
      },

      typeaheadActivationThreshold: {
        type: Number,
        default: 1
      },

      typeaheadMaxResults: {
        type: Number,
        default: 0
      },

      typeaheadAlwaysShow: {
        type: Boolean,
        default: false
      },

      typeaheadShowOnFocus: {
        type: Boolean,
        default: true
      },

      typeaheadHideDiscard: {
        type: Boolean,
        default: false
      },

      typeaheadUrl: {
        type: String,
        default: ''
      },

      placeholder: {
        type: String,
        default: 'Add a tag'
      },

      discardSearchText: {
        type: String,
        default: 'Discard Search Results'
      },

      limit: {
        type: Number,
        default: 0
      },

      hideInputOnLimit: {
        type: Boolean,
        default: false
      },

      onlyExistingTags: {
        type: Boolean,
        default: false
      },

      deleteOnBackspace: {
        type: Boolean,
        default: true
      },

      allowDuplicates: {
        type: Boolean,
        default: false
      },

      validate: {
        type: Function,
        default: () => true
      },

      addTagsOnComma: {
        type: Boolean,
        default: false
      },

      addTagsOnSpace: {
        type: Boolean,
        default: false
      },

      addTagsOnBlur: {
        type: Boolean,
        default: false
      },

      wrapperClass: {
        type: String,
        default: 'tags-input-wrapper-default'
      },

      sortSearchResults: {
        type: Boolean,
        default: true
      },

      caseSensitiveTags: {
        type: Boolean,
        default: false
      },

      beforeAddingTag: {
        type: Function,
        default: () => true
      },

      beforeRemovingTag: {
        type: Function,
        default: () => true
      }
    },
    data() {
      return {
        badgeId: 0,
        tags: [],

        input: '',
        oldInput: '',
        hiddenInput: '',

        searchResults: [],
        searchSelection: 0,

        selectedTag: -1,

        isActive: false
      };
    },

    created() {
      this.tagsFromValue();

      if (this.typeaheadAlwaysShow) {
        this.searchTag(false);
      }
    },

    mounted() {
      this.$emit('initialized');

      document.addEventListener('click', (e) => {
        if (e.target !== this.$refs['taginput']) {
          this.clearSearchResults();
        }
      });
    },

    computed: {
      hideInputField() {
        return (this.hideInputOnLimit && this.limit > 0 && this.tags.length >= this.limit);
      }
    },

    watch: {
      input(newVal, oldVal) {
        this.searchTag(false);

        if (newVal.length && newVal != oldVal) {
          const diff = newVal.substring(oldVal.length, newVal.length);

          if (this.addTagsOnSpace) {
            if (newVal.endsWith(' ')) {
              this.input = newVal.trim();
              this.tagFromInput(true);
            }
          }

          if (this.addTagsOnComma) {
            newVal = newVal.trim();

            if (newVal.endsWith(',')) {
              this.input = newVal.substring(0, newVal.length - 1);
              this.tagFromInput(true);
            }
          }

          this.$emit('change', newVal);
        }
      },

      tags() {
        this.hiddenInput = JSON.stringify(this.tags);
        this.$emit('input', this.tags);
      },

      value() {
        this.tagsFromValue();
      },

      typeaheadAlwaysShow(newValue) {
        if (newValue) {
          this.searchTag(false);
        } else {
          this.clearSearchResults();
        }
      }
    },

    methods: {
      /**
       * Remove reserved regex characters from a string so that they don't
       * affect search results
       *
       * @param string
       * @returns String
       */
      escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      },

      /**
       * Add a tag whether from user input or from search results (typeahead)
       *
       * @param ignoreSearchResults
       * @returns void
       */
      tagFromInput(ignoreSearchResults = false) {
        if (this.searchResults.length && this.searchSelection >= 0 && !ignoreSearchResults) {
          this.tagFromSearch(this.searchResults[this.searchSelection]);

          this.input = '';
        } else {
          let text = this.input.trim();
          if (!this.onlyExistingTags && text.length && this.validate(text)) {
            this.input = '';

            let newTag = {
              key: '',
              value: text
            };

            const searchQuery = this.escapeRegExp(
              this.caseSensitiveTags
                ? newTag.value
                : newTag.value.toLowerCase()
            );

            for (let tag of this.existingTags) {
              const compareable = this.caseSensitiveTags
                ? tag.value
                : tag.value.toLowerCase();

              if (searchQuery === compareable) {
                newTag = Object.assign({}, tag);

                break;
              }
            }

            this.addTag(newTag);
          }
        }
      },

      /**
       * Add a tag from search results when a user clicks on it
       *
       * @param tag
       * @returns void
       */
      tagFromSearchOnClick(tag) {
        this.tagFromSearch(tag);

        this.$refs['taginput'].blur();
      },

      /**
       * Add the selected tag from the search results.
       * Clear search results.
       * Clear user input.
       *
       * @param tag
       * @return void
       */
      tagFromSearch(tag) {
        this.clearSearchResults();
        this.addTag(tag);

        this.$nextTick(() => {
          this.input = '';
          this.oldInput = '';
        });
      },

      /**
       * Add/Select a tag
       *
       * @param tag
       * @returns void | Boolean
       */
      addTag(tag) {
        if (!this.beforeAddingTag(tag)) {
          return false;
        }

        if (this.limit > 0 && this.tags.length >= this.limit) {
          this.$emit('limit-reached');

          return false;
        }

        if (!this.tagSelected(tag)) {
          this.tags.push(tag);

          this.$nextTick(() => {
            this.$emit('tag-added', tag);
            this.$emit('tags-updated');
          });
        }
      },

      /**
       * Remove the last tag in the tags array.
       *
       * @returns void
       */
      removeLastTag() {
        if (!this.input.length && this.deleteOnBackspace && this.tags.length) {
          this.removeTag(this.tags.length - 1);
        }
      },

      /**
       * Remove the selected tag at the specified index.
       *
       * @param index
       * @returns void
       */
      removeTag(index) {
        let tag = this.tags[index];

        if (!this.beforeRemovingTag(tag)) {
          return false;
        }

        this.tags.splice(index, 1);

        this.$nextTick(() => {
          this.$emit('tag-removed', tag);
          this.$emit('tags-updated');

          if (this.typeaheadAlwaysShow) {
            this.searchTag();
          }
        });
      },

      /**
       * Search the currently entered text in the list of existing tags
       *
       * @returns void | Boolean
       */
      searchTag() {
        if (this.typeahead !== true) {
          return false;
        }

        if (this.oldInput != this.input || (!this.searchResults.length && this.typeaheadActivationThreshold == 0) || this.typeaheadAlwaysShow || this.typeaheadShowOnFocus) {
          this.searchResults = [];
          this.searchSelection = 0;
          let input = this.input.trim();

          if ((input.length && input.length >= this.typeaheadActivationThreshold) || this.typeaheadActivationThreshold == 0 || this.typeaheadAlwaysShow) {
            const searchQuery = this.escapeRegExp(
              this.caseSensitiveTags ? input : input.toLowerCase()
            );

            if (this.typeaheadUrl.length > 0) {
              this.existingTags.splice();
              const xhttp = new XMLHttpRequest();
              const that = this;

              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  that.existingTags = JSON.parse(xhttp.responseText);

                  that.doSearch(searchQuery);
                }
              };

              const endpoint = this.typeaheadUrl.replace(':search', searchQuery);
              xhttp.open('GET', endpoint, true);
              xhttp.send();
            } else {
              this.doSearch(searchQuery);
            }
          }

          this.oldInput = this.input;
        }
      },

      /**
       * Perform the actual search
       *
       * @param string searchQuery
       * @return void
       */
      doSearch(searchQuery) {
        for (let tag of this.existingTags) {
          const compareable = this.caseSensitiveTags
            ? tag.value
            : tag.value.toLowerCase();

          if (compareable.search(searchQuery) > -1 && !this.tagSelected(tag)) {
            this.searchResults.push(tag);
          }
        }

        if (this.sortSearchResults) {
          this.searchResults.sort((a, b) => {
            if (a.value < b.value) {
              return -1;
            }
            if (a.value > b.value) {
              return 1;
            }

            return 0;
          });
        }

        if (this.typeaheadMaxResults > 0) {
          this.searchResults = this.searchResults.slice(
            0,
            this.typeaheadMaxResults
          );
        }
      },

      /**
       * Hide the typeahead if there's nothing intered into the input field.
       *
       * @returns void
       */
      hideTypeahead() {
        if (!this.input.length) {
          this.$nextTick(() => {
            this.clearSearchResults();
          });
        }
      },

      /**
       * Select the next search result in typeahead.
       *
       * @returns void
       */
      nextSearchResult() {
        if (this.searchSelection + 1 <= this.searchResults.length - 1) {
          this.searchSelection++;
        }
      },

      /**
       * Select the previous search result in typeahead.
       *
       * @returns void
       */
      prevSearchResult() {
        if (this.searchSelection > 0) {
          this.searchSelection--;
        }
      },

      /**
       * Clear/Empty the search results.
       *
       * @reutrns void
       */
      clearSearchResults(returnFocus = false) {
        this.searchResults = [];
        this.searchSelection = 0;

        if (this.typeaheadAlwaysShow) {
          this.$nextTick(() => {
            this.searchTag();
          });
        }

        if (returnFocus) {
          this.$refs['taginput'].focus();
        }
      },

      /**
       * Clear the list of selected tags.
       *
       * @returns void
       */
      clearTags() {
        this.tags.splice(0, this.tags.length);
      },

      /**
       * Replace the currently selected tags with the tags from the value.
       *
       * @returns void
       */
      tagsFromValue() {
        if (this.value && this.value.length) {
          if (!Array.isArray(this.value)) {
            return;
          }

          let tags = this.value;

          if (this.tags == tags) {
            return;
          }

          this.clearTags();

          for (let tag of tags) {
            this.addTag(tag);
          }
        } else {
          if (this.tags.length == 0) {
            return;
          }

          this.clearTags();
        }
      },

      /**
       * Check if a tag is already selected.
       *
       * @param tag
       * @returns Boolean
       */
      tagSelected(tag) {
        if (this.allowDuplicates) {
          return false;
        }

        if (!tag) {
          return false;
        }

        const searchQuery = this.escapeRegExp(
          this.caseSensitiveTags ? tag.value : tag.value.toLowerCase()
        );

        for (let selectedTag of this.tags) {
          const compareable = this.caseSensitiveTags
            ? selectedTag.value
            : selectedTag.value.toLowerCase();

          if (selectedTag.key === tag.key && this.escapeRegExp(compareable).length == searchQuery.length && compareable.search(searchQuery) > -1) {
            return true;
          }
        }

        return false;
      },

      /**
       * Clear the input.
       *
       * @returns void
       */
      clearInput() {
        this.input = '';
      },

      /**
       * Process all the keyup events.
       *
       * @param e
       * @returns void
       */
      onKeyUp(e) {
        this.$emit('keyup', e);
      },

      /**
       * Process all the keydown events.
       *
       * @param e
       * @returns void
       */
      onKeyDown(e) {
        this.$emit('keydown', e);
      },

      /**
       * Process the onfocus event.
       *
       * @param e
       * @returns void
       */
      onFocus(e) {
        this.$emit('focus', e);

        this.isActive = true;
      },

      /**
       * Process the onClick event.
       *
       * @param e
       * @returns void
       */
      onClick(e) {
        this.$emit('click', e);

        this.isActive = true;

        this.searchTag();
      },

      /**
       * Process the onblur event.
       *
       * @param e
       * @returns void
       */
      onBlur(e) {
        this.$emit('blur', e);

        if (this.addTagsOnBlur) {
          this.tagFromInput(true);
        }

        if (!this.typeaheadAlwaysShow) {
          this.hideTypeahead();
        } else {
          this.searchTag();
        }

        this.isActive = false;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .tags-input {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    &__item {
      margin-bottom: 7px;
    }
  }

  .tags-input input {
    flex: 1;
    background: transparent;
    border: none;
    padding: 0;
  }

  .tags-input input:focus {
    outline: none;
  }

  .tags-input input[type="text"] {
    color: #495057;
    margin-bottom: 7px;
  }

  .tags-input-wrapper-default {
    min-height: 40px;
    box-sizing: border-box;
    padding: 7px 9px 0;
    background: #fff;

    border: 1px solid #DFE4EB;
    border-radius: 3px;
  }

  /* The tag badges & the remove icon */
  .tags-input span {
    margin-right: 0.3em;
  }

  .tags-input-remove {
    cursor: pointer;
    position: absolute;
    display: inline-block;
    right: 0.3em;
    top: 0.3em;
    padding: 0.5em;
    overflow: hidden;
  }

  .tags-input-remove:focus {
    outline: none;
  }

  .tags-input-remove:before, .tags-input-remove:after {
    content: '';
    position: absolute;
    width: 75%;
    left: 0.15em;
    background: #5dc282;

    height: 2px;
    margin-top: -1px;
  }

  .tags-input-remove:before {
    transform: rotate(45deg);
  }

  .tags-input-remove:after {
    transform: rotate(-45deg);
  }

  .tags-input-badge {
    position: relative;
    display: inline-block;
    padding: 0.25em 0.4em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25em;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tags-input-badge-pill {
    padding-right: 1.25em;
    padding-left: 0.6em;
    border-radius: 10em;
  }

  .tags-input-badge-selected-default {
    color: #212529;
    background-color: #f0f1f2;
  }

  .typeahead-hide-btn {
    color: #999 !important;
    font-style: italic;
  }

  .typeahead-badges > span {
    cursor: pointer;
    margin-right: 0.3em;
  }

  .typeahead-dropdown {
    list-style-type: none;
    padding: 0;
    margin: 0;
    position: absolute;
    width: 100%;
    z-index: 1000;
  }

  .typeahead-dropdown li {
    padding: .25em 1em;
    cursor: pointer;
  }

  .tags-input-typeahead-item-default {
    color: #fff;
    background-color: #343a40;
  }

  .tags-input-typeahead-item-highlighted-default {
    color: #fff;
    background-color: #007bff;
  }
</style>
