const NotebookList = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>Notebooks</div>
        <i className="material-icons-outlined text-sm cursor-pointer">add_circle_outline</i>
      </div>
      <div className="ml-4 space-y-1 mt-1">
        <div>NoteBook1</div>
        <div>NoteBook2</div>
        <div>NoteBook3</div>
        <div>NoteBook4</div>
        <div>NoteBook5</div>
        <div>NoteBook6</div>
        <div>NoteBook7</div>
      </div>
    </div>
  )
}

export default NotebookList