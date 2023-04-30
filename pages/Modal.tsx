import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 
export default function Example(props: any) {
  const [open, setOpen] = useState(props.opened);
 
  const handleClick = () => {
    setOpen(!open);
    window.location.reload();
  }
 
  return (
      <Dialog open={open} handler={handleClick}>
        <DialogHeader>{props.title}</DialogHeader>
        <DialogBody divider>
          {props.body}
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="green" onClick={handleClick}>
            <span>Ok</span>
          </Button>
        </DialogFooter>
      </Dialog>
  );
}