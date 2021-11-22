class CreateCards < ActiveRecord::Migration[6.1]
  def change
    create_table :cards do |t|
      t.string :name
      t.string :set
      t.string :card_image
      t.string :full_image
      t.string :region
      t.string :rarity
      t.string :type
      t.string :supertype

      t.timestamps
    end
  end
end
