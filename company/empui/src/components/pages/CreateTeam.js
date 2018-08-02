import React from "react";

const CreateTeam = () => (
    <div>
    <h1>Create Matches</h1>
    <form>
        Game:
        <select name="game">
            <option value="hotS">Hero of the Storm</option>
            <option value="hearth">Hearth Stone</option>
            <option value="overwatch">OverWatch</option>
            <option value="wow">World of Warcraft</option>
            <option value="sc">Starcraft II</option>
        </select>
        Need to make another drop down menu of the different leagues for each game.  This should change based on the game that is selected.
        Create a drop down menu of teams that already exist once the game and league has been picked.  This will then autopopulate the form permitting updates
        <input name="teamName" placeholder="Team Name"></input>
        <input name="teamLogo" placeholder="Logo URL"></input>
        <input name="teamPage" placeholder="Team Info URL"></input>
        <button class="submit">Update</button>
    </form>
</div>
);

export default CreateTeam;