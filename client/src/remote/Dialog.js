export default class Dialog {

  constructor(backend) {
    this.backend = backend;
  }

  /**
   * Show open dialog.
   *
   * @param {Object} options Options.
   * @param {String} options.defaultPath Default path.
   * @param {Object} options.filters Extension filters.
   * @param {String} [options.title] Dialog title.
   *
   * @returns {Promise}
   */
  showOpenFilesDialog(options) {
    return this.backend.send('dialog:open-files', options);
  }

  /**
   * Show save dialog.
   *
   * @param {Object} options Options.
   * @param {String} [options.defaultPath] Default path.
   * @param {Object} [options.filters] Extension filters.
   * @param {String} [options.title] Dialog title.
   *
   * @returns {Promise}
   */
  showSaveFileDialog(options) {
    return this.backend.send('dialog:save-file', options);
  }

  /**
   * Shows a dialog that can e configured.
   *
   * @param {Object} options - Options.
   * @param {Array} [options.buttons] - Buttons.
   * @param {String} [options.detail] - detail.
   * @param {String} [options.message] - Message.
   * @param {String} [options.title] - Title.
   * @param {String} options.type - Type (info, warning, error, question).
   *
   * @returns {Promise}
   */
  show(options) {
    return this.backend.send('dialog:show', options);
  }

  /**
   * Shows dialog asking the user to either save or discard changes before closing.
   *
   * @param {Object} options - Options.
   * @param {String} [options.name] - Name.
   *
   * @returns {Promise}
   */
  showCloseFileDialog(options) {
    const {
      name
    } = options;

    return this.show({
      type: 'question',
      title: 'Close File',
      message: `Save changes to "${ name }" before closing?`,
      buttons: [
        { id: 'cancel', label: 'Cancel' },
        { id: 'save', label: 'Save' },
        { id: 'discard', label: 'Don\'t Save' }
      ]
    });
  }

  /**
   * Shows dialog with error.
   *
   * @param {Object} options - Options.
   * @param {Object} [options.detail] - Detail.
   * @param {Object} [options.message] - Message.
   * @param {Object} [options.name] - Name.
   *
   * @return {Promise}
   */
  showOpenFileErrorDialog = async (options) => {
    return this.backend.send('dialog:open-file-error', options);
  }

  /**
   * Shows dialog asking the user to create a new file.
   *
   * @param {Object} options - Options.
   * @param {String} file - File.
   * @param {String} type - Filetype.
   */
  showEmptyFileDialog = async (options) => {
    const {
      file,
      type
    } = options;

    const typeUpperCase = type.toUpperCase();

    return this.show({
      type: 'info',
      title: [
        'Empty ',
        typeUpperCase,
        ' file'
      ].join(''),
      buttons: [
        { id: 'cancel', label: 'Cancel' },
        { id: 'create', label: 'Create' }
      ],
      message: `The file "${ file.name }" is empty.`,
      detail: `Would you like to create a new ${ typeUpperCase } file?`
    });
  }

}