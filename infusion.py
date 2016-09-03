# NOTE, THIS SHIT DOESN'T WORK



def infusion():
    grist = input("Input your grist size: ")
    # Make try/catch for these input for int or float type. Can probably use function for that
    ratio = input("Input your desired infusion rate: ")
    waterAmt = grist * ratio
    if mashtunVol:
        mashVol = grist + absorption + waterAmt
        if (mashtunVol * .75) > mashVol:
            return "you are within optimal conditions for your mash tub"
        elif (mashtunVol * .9) > mashVol:
            return "you are exceeding recommended mash tun volumes by a bit"
        elif (mashtunVol) > mashVol:
            return  "you are dangerously close to exceeding your mash tun capacity"
        elif mashtunVol <= mashVol:
            return "It is not possible to mash this"
