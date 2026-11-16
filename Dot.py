
import os
import time



def clear_screen():

    os.system('cls' if os.name == 'nt' else 'clear')

def christmas_tree_animation(rows = 6, animation_delay = 0.5):
    """prints animated characters (*)"""
    for i in range(rows, 0, -1):
        clear_screen()
        #This is for the top part

        #now for the spaces we will use j
        for j in range(i, rows + 1):
            spaces = ' ' * (rows - j)
            stars = '*' * (2 * j - 1)
            print(stars + spaces)

            #now for the trunk of the tree
            trunk_spaces = ' ' * (rows - 1)
            trunk = '*'
            print(trunk_spaces + trunk)

            #final display
            clear_screen()
            for i in range (1, rows + 1):
                spaces = ' ' * (rows - 1)
                stars = '*' * (2 * i - 1)
                print(spaces + stars)

                trunk_spaces = ' ' * (rows - 1)
                trunk = '*'
                print(trunk_spaces + trunk)

                if __name__ == "__main__":
                    christmas_tree_animation(rows = 6, animation_delay = 0.3)

