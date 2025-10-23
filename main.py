def start_game():
    print("Welcome to *For Life and Limb!*")
    print("You awaken in a dimly lit forest, with two paths before you...")
    print("Do you go LEFT toward the glowing light, or RIGHT into the shadows?")
    
    choice = input("Type LEFT or RIGHT: ").strip().lower()
    
    if choice == "left":
        print("You follow the light and find an ancient shrine. You feel at peace. ✨")
    elif choice == "right":
        print("The shadows twist around you. You hear whispers... and vanish. 💀")
    else:
        print("Unable to decide, you wander endlessly until dawn. 🌙")

if __name__ == "__main__":
    start_game()
