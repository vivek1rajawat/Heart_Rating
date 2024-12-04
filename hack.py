import serial
import matplotlib.pyplot as plt
import time

# Set up the serial connection
ser = serial.Serial('COM7', 115200)  # If your Arduino is connected to COM3

# Create lists to store the heart rate and blood pressure data
heart_rates = []
systolic_pressures = []
diastolic_pressures = []

# Set up the figure for the plot
plt.ion()
fig, (ax1, ax2) = plt.subplots(2, 1)

while True:
    # Read data from Arduino
    line = ser.readline().decode('utf-8').strip()
    
    if "Heart Rate" in line and "Blood Pressure" in line:
        # Extract heart rate and blood pressure values from the serial data
        parts = line.split(", ")
        heart_rate = int(parts[0].split(": ")[1])
        blood_pressure = parts[1].split(": ")[1]
        systolic, diastolic = map(int, blood_pressure.split("/"))
        
        # Add data to the lists
        heart_rates.append(heart_rate)
        systolic_pressures.append(systolic)
        diastolic_pressures.append(diastolic)
        
        # Update the plots
        ax1.clear()
        ax2.clear()
        
        # Heart rate plot
        ax1.plot(heart_rates, label="Heart Rate (bpm)", color='r')
        ax1.set_title("Heart Rate Over Time")
        ax1.set_ylabel("Heart Rate (bpm)")
        ax1.legend()
        
        # Blood pressure plot
        ax2.plot(systolic_pressures, label="Systolic (mmHg)", color='g')
        ax2.plot(diastolic_pressures, label="Diastolic (mmHg)", color='b')
        ax2.set_title("Blood Pressure Over Time")
        ax2.set_ylabel("Pressure (mmHg)")
        ax2.legend()

        # Display the updated plots
        plt.draw()
        plt.pause(0.1)  # Pause for a short period to update the plot

    time.sleep(0.5)  # Delay to match the Arduino delay
