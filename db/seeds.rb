# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require "open-uri"

# ApplicationRecord.transaction do
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Review.destroy_all
    CartItem.destroy_all
    User.destroy_all
    Product.destroy_all


    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('products')

    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      username: 'Demo-lition',
      email: 'demo@user.io',
      password: 'password'
    )

    # More users
    10.times do
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password'
      })
    end

    puts "Creating products..."

    product1 = Product.create!(
      name: 'push-active-wireless-earbuds',
      fullname: 'Push™ Active True Wireless Earbuds',
      price: '79.99',
      color: 'Dark Blue/Green,Light Grey/Blue,Black/Orange',
      details:
      'VOICE CONTROL. ADVENTURE READY.
      Push™ Active True Wireless Earbuds
      $79.99
      4 interest-free payments of $19.99 with Klarna.',
      wired: false,
      gaming: false,
      headset: false,
      accessory: false
    )

    product1.photos.attach(
      [{io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/push-green-1.jpg"), filename: "Dark.Blue.Green.1.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/push-green-2.jpg"), filename: "Dark.Blue.Green.2.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/push-green-3.jpg"), filename: "Dark.Blue.Green.3.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/push-green-4.jpg"), filename: "Dark.Blue.Green.4.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/push-green-i.jpg"), filename: "Dark.Blue.Green.i.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/push-blue-1.jpg"), filename: "Light.Grey.Blue.1.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/push-blue-2.jpg"), filename: "Light.Grey.Blue.2.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/push-blue-3.jpg"), filename: "Light.Grey.Blue.3.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/push-blue-4.jpg"), filename: "Light.Grey.Blue.4.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/push-blue-i.jpg"), filename: "Light.Grey.Blue.i.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/push-orange-1.jpg"), filename: "Black.Orange.1.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/push-orange-2.jpg"), filename: "Black.Orange.2.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/push-orange-3.jpg"), filename: "Black.Orange.3.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/push-orange-4.jpg"), filename: "Black.Orange.4.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/push-orange-i.jpg"), filename: "Black.Orange.i.jpg"}
      ])

    product2 = Product.create!(
      name: 'indy-anc-wireless-earbuds',
      fullname: 'Indy™ ANC Noise Canceling True Wireless Earbuds',
      price: '129.99',
      color: 'Chill Grey,True Black',
      details:
      'Works with the Skullcandy App NO WIRES. NO NOISE.
      Indy™ ANC Noise Canceling True Wireless
      $129.99
      4 interest-free payments of $32.49 with Klarna',
      wired: false,
      gaming: false,
      headset: false,
      accessory: false
    )

    product2.photos.attach(
      [{io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/indy-black-1.jpg"), filename: "True.Black.1.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/indy-black-2.jpg"), filename: "True.Black.2.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/indy-black-3.jpg"), filename: "True.Black.3.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/indy-black-4.jpg"), filename: "True.Black.4.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/indy-black-i.png"), filename: "True.Black.i.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/indy-grey-2.jpg"), filename: "Chill.Grey.2.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/indy-grey-3.jpg"), filename: "Chill.Grey.3.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/indy-grey-4.jpg"), filename: "Chill.Grey.4.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/indy-grey-1.jpg"), filename: "Chill.Grey.1.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/indy-grey-i.png"), filename: "Chill.Grey.i.jpg"}
      ])

    product3 = Product.create!(
      name: 'grind-wireless-earbuds',
      fullname: 'Grind® True Wireless Earbuds',
      price: '79.99',
      color: 'True Black,Chill Grey,Dark Blue/Green',
      details:
      "VOICE CONTROL, ULTIMATE FREEDOM.
      Grind® True Wireless Earbuds
      $79.99
      4 interest-free payments of $19.99 with Klarna.",
      wired: false,
      gaming: false,
      headset: false,
      accessory: false
    )

    product3.photos.attach(
      [{io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/grind-black-1.jpg"), filename: "True.Black.1.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/grind-black-2.jpg"), filename: "True.Black.2.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/grind-black-3.jpg"), filename: "True.Black.3.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/grind-black-4.jpg"), filename: "True.Black.4.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/grind-black-i.png"), filename: "True.Black.i.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/grind-grey-1.jpg"), filename: "Chill.Grey.1.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/grind-grey-2.jpg"), filename: "Chill.Grey.2.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/grind-grey-3.jpg"), filename: "Chill.Grey.3.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/grind-grey-4.jpg"), filename: "Chill.Grey.4.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/grind-grey-i.png"), filename: "Chill.Grey.i.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/grind-green-1.jpg"), filename: "Dark.Blue.Green.1.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/grind-green-2.jpg"), filename: "Dark.Blue.Green.2.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/grind-green-3.jpg"), filename: "Dark.Blue.Green.3.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/grind-green-4.jpg"), filename: "Dark.Blue.Green.4.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/grind-green-i.png"), filename: "Dark.Blue.Green.i.jpg"}
      ])

    product4 = Product.create!(
      name: 'inkd-plus',
      fullname: "Ink'd®+ Earbuds with Microphone",
      price: '17.99',
      color: 'Cobalt Blue,Black,Faded Pink,Fresh Mint',
      details:
      "THE ORIGINAL ESSENTIAL.
      Ink'd®+ Earbuds with Microphone
      $17.99
      4 interest-free payments. Available for orders above $20. Klarna.",
      wired: true,
      gaming: false,
      headset: false,
      accessory: false
    )

    product4.photos.attach(
      [{io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/inked-black-1.jpg"), filename: "Black.1.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/inked-black-i.jpg"), filename: "Black.i.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/inked-blue-1.jpg"), filename: "Cobalt.Blue.1.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/inked-blue-i.jpg"), filename: "Cobalt.Blue.i.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/inked-pink-1.jpg"), filename: "Faded.Pink.1.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/inked-pink-i.jpg"), filename: "Faded.Pink.i.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/inked-white-1.jpg"), filename: "Fresh.Mint.1.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/inked-white-i.jpg"), filename: "Fresh.Mint.i.jpg"}
      ])

    product5 = Product.create!(
      name: 'street-fighter-plyr',
      fullname: "Street Fighter PLYR® Multi-Platform Wireless Gaming Headset",
      price: '149.99',
      color: 'Street Fighter',
      details:
      "SKULLCANDY X STREET FIGHTER
      PLYR® Multi-Platform Wireless Gaming Headset
      $149.99
      4 interest-free payments of $37.49 with Klarna.",
      wired: false,
      gaming: true,
      headset: true,
      accessory: false
    )

    product5.photos.attach(
      [{io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/sf-plyr-1.jpg"), filename: "Street.Fighter.1.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/sf-plyr-2.jpg"), filename: "Street.Fighter.2.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/sf-plyr-3.jpg"), filename: "Street.Fighter.3.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/sf-plyr-4.jpg"), filename: "Street.Fighter.4.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/sf-plyr-i.png"), filename: "Street.Fighter.i.jpg"}
      ])

    product6 = Product.create!(
      name: 'plyr',
      fullname: "PLYR® Multi-Platform Wireless Gaming Headset",
      price: '129.99',
      color: 'Black DigiHype',
      details:
      "WIRELESS GAMING TUNED TO YOU.
      PLYR® Multi-Platform Wireless Gaming Headset
      $129.99
      4 interest-free payments of $32.49 with Klarna.",
      wired: false,
      gaming: true,
      headset: true,
      accessory: false
    )

    product6.photos.attach(
      [{io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/plyr-1.jpg"), filename: "Black.DigiHype.1.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/plyr-2.jpg"), filename: "Black.DigiHype.2.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/plyr-3.jpg"), filename: "Black.DigiHype.3.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/plyr-4.jpg"), filename: "Black.DigiHype.4.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/plyr-i.png"), filename: "Black.DigiHype.i.jpg"}
      ])

    product7 = Product.create!(
      name: 'slyr-pro',
      fullname: "SLYR® Pro Multi-Platform Wired Gaming Headset",
      price: '99.99',
      color: 'Black DigiHype,Green DigiHype,Blue DigiHype',
      details:
      "ADVANCED GAMING TUNED TO YOU.
      SLYR® Pro Multi-Platform Wired Gaming Headset
      $99.99
      4 interest-free payments of $24.99 with Klarna.",
      wired: true,
      gaming: true,
      headset: true,
      accessory: false
    )

    product7.photos.attach(
      [{io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-pro-black-1.jpg"), filename: "Black.DigiHype.1.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-pro-black-2.jpg"), filename: "Black.DigiHype.2.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-pro-black-3.jpg"), filename: "Black.DigiHype.3.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-pro-black-4.jpg"), filename: "Black.DigiHype.4.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-pro-black-i.png"), filename: "Black.DigiHype.i.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-pro-green-1.jpg"), filename: "Green.DigiHype.1.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-pro-green-2.jpg"), filename: "Green.DigiHype.2.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-pro-green-3.jpg"), filename: "Green.DigiHype.3.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-pro-green-4.jpg"), filename: "Green.DigiHype.4.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-pro-green-i.png"), filename: "Green.DigiHype.i.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-pro-blue-1.jpg"), filename: "Blue.DigiHype.1.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-pro-blue-2.jpg"), filename: "Blue.DigiHype.2.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-pro-blue-3.jpg"), filename: "Blue.DigiHype.3.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-pro-blue-4.jpg"), filename: "Blue.DigiHype.4.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-pro-blue-i.png"), filename: "Blue.DigiHype.i.jpg"}
      ])

    product8 = Product.create!(
      name: 'slyr',
      fullname: "SLYR® Multi-Platform Wired Gaming Headset",
      price: '59.99',
      color: 'Blue DigiHype,Black DigiHype,Green DigiHype',
      details:
      "GAMING ESSENTIAL, PREMIUM SOUND.
      SLYR® Multi-Platform Wired Gaming Headset
      $59.99
      4 interest-free payments of $14.99 with Klarna.",
      wired: true,
      gaming: true,
      headset: true,
      accessory: false
    )

    product8.photos.attach(
      [{io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-black-1.jpg"), filename: "Black.DigiHype.1.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-black-2.jpg"), filename: "Black.DigiHype.2.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-black-3.jpg"), filename: "Black.DigiHype.3.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-black-4.jpg"), filename: "Black.DigiHype.4.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-black-i.png"), filename: "Black.DigiHype.i.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-green-1.jpg"), filename: "Green.DigiHype.1.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-green-2.jpg"), filename: "Green.DigiHype.2.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-green-3.jpg"), filename: "Green.DigiHype.3.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-green-4.jpg"), filename: "Green.DigiHype.4.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-green-i.png"), filename: "Green.DigiHype.i.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-blue-1.jpg"), filename: "Blue.DigiHype.1.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-blue-2.jpg"), filename: "Blue.DigiHype.2.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-blue-3.jpg"), filename: "Blue.DigiHype.3.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-blue-4.jpg"), filename: "Blue.DigiHype.4.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/slyr-blue-i.png"), filename: "Blue.DigiHype.i.jpg"}
      ])

    product9 = Product.create!(
      name: 'fix-rapid-g-max',
      fullname: "Fix™ Rapid G Max",
      price: '49.99',
      color: 'Dark Blue/Green',
      details:
      "GET YOUR POWER FIX FASTER.
      Fix™ Rapid G Max USB-A and USB-C Adapter
      $49.99
      4 interest-free payments of $12.49 with Klarna.",
      wired: false,
      gaming: false,
      headset: false,
      accessory: true
    )

    product9.photos.attach(
      [{io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/fix-1.jpg"), filename: "Dark.Blue.Green.1.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/fix-2.jpg"), filename: "Dark.Blue.Green.2.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/fix-3.jpg"), filename: "Dark.Blue.Green.3.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/fix-i.png"), filename: "Dark.Blue.Green.i.jpg"}
      ])

    product10 = Product.create!(
      name: 'low-latency-wireless-transmitter',
      fullname: "Ultra Low Latency Wireless Transmitter for PLYR®",
      price: '24.99',
      color: 'True Black',
      details:
      "WHEN MILLISECONDS MATTER.
      Ultra-Low Latency Wireless Transmitter for PLYR®
      $24.99
      4 interest-free payments of $6.24 with Klarna.",
      wired: false,
      gaming: true,
      headset: false,
      accessory: true
    )

    product10.photos.attach(
      [{io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/transmitter-1.jpg"), filename: "True.Black.1.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/transmitter-2.jpg"), filename: "True.Black.2.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/transmitter-3.jpg"), filename: "True.Black.3.jpg"},
      {io: URI.open("https://soulcandy-seeds-2.s3.us-west-1.amazonaws.com/transmitter-i.png"), filename: "True.Black.i.jpg"}
      ])

    puts "Creating Reviews..."

    Review.create!(
      name:"YOU WIN",
      rating:5,
      body:"I am enjoying these headphones so much. I can take them anywhere and they are really comfy. Just wish that they were wireless with all devices. The device needed to connect it is sold separately. Apart from that the bluetooth connectivity and wired connectivity is great. Customizing the audio is fun too.",
      product_id: 5,
      user_id:1
    )

    Review.create!(
      name:"VERY GOOD",
      rating:5,
      body:"I always buy Skullcandy because the products are always top tier down to the earbuds",
      product_id: 5,
      user_id:4
    )

    Review.create!(
      name:"AWESOME PRODUCT LOVING IT",
      rating:5,
      body:"Awesome product loving it",
      product_id: 5,
      user_id:6
    )

    Review.create!(
      name:"MORE THAN HAPPY",
      rating:5,
      body:"MORE THAN HAPPY",
      product_id: 1,
      user_id:6
    )

    Review.create!(
      name:"I’M HAPPY WITH MY PURCHASE",
      rating:5,
      body:"So Far, So Good :)",
      product_id: 1,
      user_id:6
    )

    Review.create!(
      name:"EXCELLENT",
      rating:5,
      body:"Best ear buds I have ever used. The carrying case/charger design is pure genius.",
      product_id: 1,
      user_id:6
    )

    Review.create!(
      name:"GREAT HEADPHONES",
      rating:5,
      body:"These headphones are great and are a great price.",
      product_id: 1,
      user_id:6
    )

    Review.create!(
      name:"WORKING GREAT SO FAR, WITH AWESOME SOUND AND SOLID NOISE CANCELLATION.",
      rating:5,
      body:"Good quality and sound!",
      product_id: 1,
      user_id:6
    )

    Review.create!(
      name:"SUPER COOL",
      rating:5,
      body:"Great product, and great customer service..",
      product_id: 2,
      user_id:6
    )

    Review.create!(
      name:"AWESOME BUT WHEN DELIVERED THEY",
      rating:5,
      body:"Awesome but when delivered they struggled to stay synced up and play the audio accurately",
      product_id: 2,
      user_id:6
    )

    Review.create!(
      name:"EXCELENT!",
      rating:5,
      body:"Excelent!good fit, great sound.",
      product_id: 2,
      user_id:6
    )

    Review.create!(
      name:"ME AND MY MUSICALLY",
      rating:5,
      body:"There are awesome, the sound is totally perfect",
      product_id: 2,
      user_id:6
    )

    Review.create!(
      name:"BETTER THAN EXPECTED",
      rating:5,
      body:"Fits well, noise canceling and audio are good. Good price point.",
      product_id: 2,
      user_id:6
    )

    Review.create!(
      name:"PERFECT",
      rating:5,
      body:"Perfect",
      product_id: 3,
      user_id:6
    )

    Review.create!(
      name:"THESE ARE A GREAT PRODUCT.",
      rating:5,
      body:"These are a great product. Easy to use and great sound.",
      product_id: 3,
      user_id:6
    )

    Review.create!(
      name:"EVERYTHING I WANT IN EARBUDS",
      rating:5,
      body:"These have awesome bass :sign_horns|type_2:",
      product_id: 3,
      user_id:6
    )

    Review.create!(
      name:"UNSURE!",
      rating:5,
      body:"Truly dont know, they wouldnt charge so I didn't get to use them!",
      product_id: 3,
      user_id:6
    )

    Review.create!(
      name:"WHERE HAVE YOU BEEN MY WHOLE LIFE!",
      rating:5,
      body:"This is another great product by Skullcandy, love the features and would recomend to anyone in the market for wireless earbuds!",
      product_id: 3,
      user_id:6
    )

    puts "Done!"
  # end
