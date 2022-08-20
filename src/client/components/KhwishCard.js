import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

const KhwishCard = withStyles({
  root: {
    minWidth: 0,
    border: "1px solid",
    borderColor: "#005CB9",
  },
})(Card);

export default KhwishCard;
