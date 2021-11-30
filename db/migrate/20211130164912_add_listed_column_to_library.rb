class AddListedColumnToLibrary < ActiveRecord::Migration[6.1]
  def change
    add_column :libraries, :listed, :boolean
  end
end
