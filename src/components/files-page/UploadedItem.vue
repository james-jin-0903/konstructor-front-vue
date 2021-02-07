<template lang="pug">
  .uploaded-item(
    v-click-outside="saveChanges"
    v-click-outside.right="closeContextMenu"
    :class="{ 'uploaded-item--list': isListItem, 'uploaded-item--block': !isListItem }"
  )
    .uploaded-item__main-info
      .uploaded-item__cover(
        :class="{ 'uploaded-item__cover--gray': isShownPreview }"
        v-click-outside="closeContextMenu"
        v-click-outside.right="closeContextMenu"
      )
        template(v-if="item.cover && item.cover.length")
          img(
            :src="item.cover"
            width="30"
            height="30"
            @click="showContextMenu($event, 'preview')"
            @click.right.prevent="showContextMenu($event, 'context-menu')"
          )
        template(v-else)
          .uploaded-item__cover.uploaded-item__cover--empty(v-if="isListItem")
            img(:src="icons.constructor" width="14" height="16")
          .uploaded-item__cover.uploaded-item__cover--empty(
            v-if="!isListItem && item.uploadType === 'File'"
            @click.right.prevent="showContextMenu($event, 'context-menu')"
            v-click-outside.right="closeContextMenu"
          ): FileIcon
          .uploaded-item__cover.uploaded-item__cover--empty(
            v-if="!isListItem && item.uploadType === 'Folder'"
            @click.right.prevent="showContextMenu($event, 'context-menu')"
            v-click-outside.right="closeContextMenu"
          ): FolderIcon
      .uploaded-item__icon(v-if="isListItem")
        template(v-if="item.uploadType === itemTypes.FOLDER")
          img(:src="icons.folder_outline" width="16")
        template(v-else)
          img(:src="icons.file_outline" width="16")
      .uploaded-item__name-block
        p.uploaded-item__name(
          v-if="!isEditMode && !isListItem"
          v-text-middle-ellipsis="5"
          :class="{ 'uploaded-item__name--editable-block': !isEditMode }"
        ) {{ item.name }}
        .uploaded-item__name(
          v-else
          :class="{ 'uploaded-item__name--editable': isEditMode }"
          :contenteditable="isEditMode"
        ) {{ item.name }}
      transition(name="fade" :duration="{ enter: 500, leave: 0 }")
        template(v-if="item.preview && item.preview.length")
          .uploaded-item__preview(
            v-if="isShownPreview"
            :style="popupStyles"
          )
            img(:src="item.preview")
      template
        transition(name="fade" :duration="{ enter: 500, leave: 0 }")
          ul(
            v-if="isContextMenuOpened"
            :style="popupStyles"
          ).uploaded-item__context-menu.dropdown
            li(
              v-for="tool of tools"
              v-bind:class="{'dropdown__item_parent': tool.children && tool.children.length }"
              @click="onToolSelect(tool)"
            ).dropdown__item
              span(v-if="tool.icon").dropdown__icon.uploaded-item__context-menu-icon
                img(:src="tool.icon")
              span.dropdown__text {{ tool.text }}
              span(v-if="tool.count").dropdown__counter.counter {{ tool.count }}
              ul.dropdown.dropdown_children(v-if="tool.children && tool.children.length")
                li(
                  v-for="childTool of tool.children"
                  @click="onToolSelect(childTool)"
                ).dropdown__item
                  span(v-if="childTool.icon").dropdown__icon.tools-dropdown__icon
                    img(:src="childTool.icon")
                  span.dropdown__text {{ childTool.text }}
                  span(v-if="childTool.count").dropdown__counter.counter {{ childTool.count }}

    .uploaded-item__meta-info(v-if="isListItem")
      .uploaded-item__meta-info-item
        .title Создатель
        router-link(to="/").link {{ item.creator }}
      .uploaded-item__meta-info-item
        .title Последнее изменение
        .info {{ item.lastChanged }}
      .uploaded-item__meta-info-item
        .title Размер
        .info {{ item.size }}
      .uploaded-item__meta-info-item
        ToolsDropdown(
          :tools="tools"
          :placeOnLeft="true"
          :noBackground="true"
          @select="onToolSelect"
          @open="isToolsDropdownOpened = true"
          @close="isToolsDropdownOpened = false"
          :class="{ 'uploaded-item__dropdown--active': isToolsDropdownOpened }"
        ).uploaded-item__dropdown
</template>

<script>
  import images from '@/components/images';
  import ToolsDropdown from '@/components/ToolsDropdown';
  import FileIcon from '@/components/icons/FileIcon';
  import FolderIcon from '@/components/icons/FolderIcon';
  import popupList from '@/components/popups/popups';

  const UploadItemType = {
    FILE: 'File',
    FOLDER: 'Folder'
  }

  export default {
    name: 'UploadedItem',
    components: {
      FolderIcon,
      FileIcon,
      ToolsDropdown
    },
    props: {
      item: {
        uploadType: {
          type: String,
          default: () => UploadItemType.FOLDER
        },
        cover: String,
        name: {
          type: String,
          required: true
        },
        creator: {
          type: String,
          required: true
        },
        lastChanged: {
          type: String,
          required: true
        },
        size: {
          type: String,
          required: true
        },
        preview: {
          type: String,
          required: false
        }
      },
      isListItem: {
        type: Boolean,
        default: () => false
      },
      tools: Array
    },
    data() {
      return {
        icons: images.icons,
        itemTypes: UploadItemType,

        isToolsDropdownOpened: false,
        isEditMode: false,

        popup: { x: 0, y: 0 },
        isShownPreview: false,
        isContextMenuOpened: false,
      }
    },
    computed: {
      popupStyles() {
        return {
          top: this.popup.y + 'px',
          left: this.popup.x + 'px'
        }
      }
    },
    methods: {
      onToolSelect({ type }) {
        switch (type) {
          case 'rename':
            this.isEditMode = true;
            break;
          case 'move':
            this.$modal.show(popupList.FILE_MOVING);
            break;
          case 'edit':
            this.$modal.show(popupList.IMAGE);
            break;
          case 'setup_access':
            this.$modal.show(popupList.ACCESS_SETTINGS);
            break;
          case 'share.social':
            this.$modal.show(popupList.SOCIAL_SHARE);
            break;
          case 'share.chat':
            this.$modal.show(popupList.CHAT_SHARE);
            break;
          default:
            break;
        }
      },
      saveChanges() {
        if (this.isEditMode) {
          this.isEditMode = false;
        }
      },
      showContextMenu({ offsetX, offsetY }, type) {
        this.closeContextMenu();

        if (type === 'preview') {
          this.isShownPreview = true;
        }
        else if (type === 'context-menu' && !this.isListItem) {
          this.isContextMenuOpened = true;
        }

        this.popup.x = offsetX;
        this.popup.y = offsetY;
      },
      closeContextMenu() {
        this.isShownPreview = false;
        this.isContextMenuOpened = false;
        this.popup.x = 0;
        this.popup.y = 0;
      },
      selectContextMenuItem() {}
    }
  }
</script>