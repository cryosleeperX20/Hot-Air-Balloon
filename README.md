# 🎈 Hot Air Balloon Canvas Game

A **simple and fun hot air balloon game** built using **HTML5 Canvas**, **JavaScript**, and a bit of CSS.  
This project was made purely for **learning the fundamentals of game development** in the browser — no fancy libraries, just pure code.

[🎮 Check it out!!!](https://cryosleeperx20.github.io/Hot-Air-Balloon/)
---

## 🎯 Objective
Navigate the hot air balloon through obstacles and survive as long as possible.  
Press **Space** or **Click** to make the balloon rise.  
Avoid colliding with obstacles or falling to the ground.

---

## 🛠️ Technologies Used
- **HTML5 Canvas** → To draw graphics (balloon, obstacles, clouds, background)
- **JavaScript** → For all game logic, physics, and controls
- **CSS** → For background styles and layout

---

## ⚙️ How It Works
1. **Canvas Setup**  
   - A `<canvas>` element fills the whole window.
   - JavaScript gets a drawing context using `canvas.getContext("2d")`.

2. **Player (Hot Air Balloon)**  
   - Drawn as a red ellipse (balloon) with a brown rectangle (basket).
   - Position changes based on velocity and gravity.
   - Pressing space/click applies an upward force (`jumpPower`).

3. **Gravity & Movement**  
   - Gravity constantly pulls the balloon down (`velocity += gravity`).
   - Each frame updates balloon position and redraws everything.

4. **Obstacles**  
   - Pairs of top and bottom rectangles with a gap.
   - Move left each frame.
   - Random heights for variety.
   - Collision detection checks if the balloon touches them.

5. **Clouds**  
   - Decorative background elements for a more dynamic scene.
   - Slowly move left to simulate motion.

6. **Score System**  
   - Increases each time an obstacle passes off-screen.

7. **Game Over State**  
   - Triggered on collision with obstacles or ground.
   - Stops movement and displays a restart message.

8. **Restart Mechanism**  
   - Press space or click to reset balloon position, score, and obstacles.

---

## 🎮 Controls
- **Space Bar** → Make the balloon rise
- **Mouse Click** → Make the balloon rise
- **When Game Over** → Space or click to restart

---
