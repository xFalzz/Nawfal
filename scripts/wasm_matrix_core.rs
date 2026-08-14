//! Nawfal UI High-Performance Kinetic Physics Engine
//! WebAssembly (WASM) compute kernel for liquid orbs, particle matrices, and spring physics.

#[derive(Debug, Clone)]
pub struct SpringState {
    pub position: f64,
    pub velocity: f64,
    pub target: f64,
    pub stiffness: f64,
    pub damping: f64,
    pub mass: f64,
}

impl SpringState {
    pub fn new(target: f64, stiffness: f64, damping: f64, mass: f64) -> Self {
        Self {
            position: 0.0,
            velocity: 0.0,
            target,
            stiffness,
            damping,
            mass,
        }
    }

    pub fn step(&mut self, delta_time: f64) -> f64 {
        let displacement = self.position - self.target;
        let spring_force = -self.stiffness * displacement;
        let damping_force = -self.damping * self.velocity;
        let total_force = spring_force + damping_force;

        let acceleration = total_force / self.mass;
        self.velocity += acceleration * delta_time;
        self.position += self.velocity * delta_time;

        self.position
    }
}

pub fn simulate_frame(state: &mut SpringState, dt: f64) -> f64 {
    state.step(dt)
}
