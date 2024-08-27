class Singleton {
  list: string[]
  obj: Object

  private static singleton: Singleton

  private constructor() {
    this.list = []
    this.obj = {}
  }

  public static getInstance(): Singleton {
    if (!Singleton.singleton) {
      Singleton.singleton = new Singleton()
    }
    return Singleton.singleton
  }
}

export { Singleton }

