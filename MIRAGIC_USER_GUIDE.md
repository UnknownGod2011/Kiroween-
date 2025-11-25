# 👕 Virtual Try-On with Miragic - User Guide

## 🎯 What You Can Do

Upload a photo of yourself and see how any t-shirt design looks on you - instantly!

---

## 🚀 Getting Started (3 Easy Steps)

### Step 1: Upload Your Photo 📸

1. Click on the **AR Try-On** section
2. You'll see a large upload area with an upload icon
3. Either:
   - **Drag & drop** your photo into the box
   - **Click** "Choose Photo" to browse your files

**💡 Tips for Best Results:**
- Use a clear, front-facing photo
- Stand straight with arms at your sides
- Good lighting is important
- Simple background works best
- Make sure your upper body is visible

### Step 2: Select a T-Shirt Design 👕

1. After uploading your photo, scroll down
2. You'll see all designs from your cart
3. Click on any design to select it
4. If the design has front and back:
   - Choose which side you want to try on
   - Click "Front" or "Back" button

### Step 3: Apply Virtual Try-On ✨

1. Make sure **"Miragic Virtual Try-On (Recommended)"** is selected
2. Click the big **"Apply Virtual Try-On"** button
3. Wait 10-30 seconds while the AI works its magic
4. See yourself wearing the t-shirt!
5. Click **"💾 Save AR Preview"** to download the image

---

## 🎨 Understanding the Interface

### Upload Section
```
┌─────────────────────────────────┐
│     📤 Upload Your Photo        │
│                                 │
│     [Upload Icon]               │
│                                 │
│   Drag & drop or click          │
│   [Choose Photo Button]         │
│                                 │
│   💡 Tips:                      │
│   • Front-facing photo          │
│   • Good lighting               │
│   • Simple background           │
└─────────────────────────────────┘
```

### Backend Selector
```
┌─────────────────────────────────┐
│   🔧 Select Backend             │
│                                 │
│   ✅ Miragic (Recommended)      │
│   Professional quality          │
│   ✅ Cloud API                  │
│                                 │
│   ⚪ Python VITON               │
│   Fast, no setup needed         │
│                                 │
│   ⚪ DeepFashion                │
│   Photo-realistic               │
└─────────────────────────────────┘
```

### Design Selector
```
┌─────────────────────────────────┐
│   Choose Design from Cart       │
│                                 │
│   ┌───────────────────────┐    │
│   │ [Image] Design Name   │    │
│   │ Size: M • Material    │    │
│   └───────────────────────┘    │
│                                 │
│   ┌───────────────────────┐    │
│   │ [Image] Design Name   │    │
│   │ Size: L • Material    │    │
│   └───────────────────────┘    │
│                                 │
│   Select Side:                  │
│   [Front] [Back]                │
└─────────────────────────────────┘
```

### Preview Section
```
┌─────────────────────────────────┐
│   AR Preview                    │
│                                 │
│   ┌─────────────────────────┐  │
│   │                         │  │
│   │   [Your photo with      │  │
│   │    t-shirt applied]     │  │
│   │                         │  │
│   └─────────────────────────┘  │
│                                 │
│   [💾 Save AR Preview]          │
└─────────────────────────────────┘
```

---

## ⏱️ What to Expect

### Processing Time
- **Miragic:** 10-30 seconds (recommended)
- **Python VITON:** 5-15 seconds (requires setup)
- **DeepFashion:** 30-60 seconds (requires setup)

### During Processing
You'll see:
```
┌─────────────────────────────────┐
│                                 │
│     [Spinning Animation]        │
│                                 │
│     AI Processing...            │
│   VITON-IT is generating        │
│   your try-on...                │
│                                 │
│   This takes 10-30 seconds      │
└─────────────────────────────────┘
```

### After Processing
You'll see:
```
┌─────────────────────────────────┐
│   AR Preview                    │
│                                 │
│   [Your Result Image]           │
│                                 │
│   [💾 Save AR Preview]          │
└─────────────────────────────────┘
```

---

## 📸 Photo Guidelines

### ✅ Good Photos

**Perfect Example:**
- Standing straight
- Arms at sides or slightly away from body
- Front-facing camera
- Good lighting (natural or bright indoor)
- Simple background (wall, plain backdrop)
- Upper body clearly visible
- Not wearing a jacket or coat

**Why it works:**
- AI can clearly see your body shape
- No obstructions
- Easy to place t-shirt design

### ❌ Photos to Avoid

**Won't Work Well:**
- Side angle or turned away
- Arms crossed over chest
- Dark or shadowy lighting
- Busy background (crowds, patterns)
- Wearing bulky clothing
- Blurry or low quality
- Only face visible (need upper body)

**Why it doesn't work:**
- AI can't determine body shape
- Design placement unclear
- Poor quality results

---

## 🎨 Design Selection Tips

### Front vs Back
- **Front:** Shows the main design on the chest
- **Back:** Shows the back design (if available)
- You can try both!

### Multiple Designs
- Try different designs to compare
- See which one looks best on you
- Mix and match with different photos

---

## 🐛 Troubleshooting

### "Please upload a photo first"
→ You need to upload a photo before selecting a design

### "Please select a design"
→ Choose a t-shirt design from your cart

### "Cannot connect to server"
→ Make sure the backend server is running
→ Ask the developer to start it with `npm run start:sd`

### "Try-on failed"
→ Try a different photo (front-facing, good lighting)
→ Make sure the photo is clear and not blurry
→ Check that your upper body is visible

### "Processing timeout"
→ The server might be busy
→ Try again in a moment
→ Use a smaller image file

### Result doesn't look good
→ Try a different photo with better lighting
→ Make sure you're standing straight
→ Use a simpler background
→ Try the front-facing angle

---

## 💡 Pro Tips

1. **Best Lighting:** Natural daylight or bright indoor lighting
2. **Best Pose:** Stand straight, arms slightly away from body
3. **Best Background:** Plain wall or simple backdrop
4. **Best Distance:** Full upper body visible, not too close
5. **Best Quality:** Use a good camera, avoid selfies if possible

### Example Workflow
1. Take a good photo (or use an existing one)
2. Upload to AR Try-On
3. Select your favorite design
4. Click "Apply Virtual Try-On"
5. Wait for result
6. Save the image
7. Try another design!
8. Compare results
9. Choose your favorite
10. Order the t-shirt!

---

## 🎊 What Makes Miragic Special?

### Why It's Recommended

✅ **No Setup Required**
- Works immediately
- No software to install
- No technical knowledge needed

✅ **Professional Quality**
- Commercial-grade AI
- Realistic results
- Natural-looking placement

✅ **Fast & Reliable**
- Cloud-powered
- Always available
- Consistent results

✅ **Easy to Use**
- Simple interface
- Clear instructions
- Helpful error messages

---

## 📱 Mobile Tips

If using on mobile:
1. Take photo with back camera (better quality)
2. Make sure lighting is good
3. Use a timer or ask someone to help
4. Stand about 6-8 feet from camera
5. Upload directly from camera roll

---

## 🎯 Success Checklist

Before clicking "Apply Virtual Try-On":

- [ ] Photo is uploaded
- [ ] Photo is front-facing
- [ ] Upper body is visible
- [ ] Lighting is good
- [ ] Design is selected
- [ ] Miragic backend is selected
- [ ] Ready to wait 10-30 seconds

---

## 🎉 Enjoy Your Virtual Try-On!

Now you can see how any t-shirt design looks on you before ordering. Try different designs, share with friends, and find your perfect style! 👕✨

**Questions?** Check the troubleshooting section or ask for help!
