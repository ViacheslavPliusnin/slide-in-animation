function* generateId(): Generator<number, number, number> {
  let i = 0;
  while (true) {
    yield (i += 1);
  }
}

export default generateId;
